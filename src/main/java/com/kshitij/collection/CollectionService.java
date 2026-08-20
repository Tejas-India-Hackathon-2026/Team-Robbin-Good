package com.kshitij.collection;

import com.kshitij.common.exception.BadRequestException;
import com.kshitij.common.exception.ResourceNotFoundException;
import com.kshitij.collection.dto.*;
import com.kshitij.impact.Co2EstimateService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CollectionService {
    private static final int POINTS_PER_KG = 2;

    private final PickupRequestRepository pickupRepo;
    private final CollectionAgentRepository agentRepo;
    private final AggregationBatchRepository batchRepo;
    private final RewardTransactionRepository rewardTxnRepo;
    private final RewardBalanceRepository rewardBalanceRepo;
    private final Co2EstimateService co2EstimateService;

    public CollectionService(PickupRequestRepository pickupRepo,
                             CollectionAgentRepository agentRepo,
                             AggregationBatchRepository batchRepo,
                             RewardTransactionRepository rewardTxnRepo,
                             RewardBalanceRepository rewardBalanceRepo,
                             Co2EstimateService co2EstimateService) {
        this.pickupRepo = pickupRepo;
        this.agentRepo = agentRepo;
        this.batchRepo = batchRepo;
        this.rewardTxnRepo = rewardTxnRepo;
        this.rewardBalanceRepo = rewardBalanceRepo;
        this.co2EstimateService = co2EstimateService;
    }

    /*
     * POST /api/pickup-requests
     * Household user requests a pickup.
     */
    public PickupRequest createPickupRequest(Long householdUserId, CreatePickupRequest req) {
        PickupRequest pr = new PickupRequest();
        pr.setHouseholdUserId(householdUserId);
        pr.setWasteType(req.getWasteType());
        pr.setEstimatedQuantity(req.getEstimatedQuantity());
        pr.setUnit(req.getUnit());
        pr.setAddress(req.getAddress());
        pr.setCity(req.getCity());
        pr.setStatus(PickupStatus.REQUESTED);
        return pickupRepo.save(pr);
    }

    /*
     * PUT /api/pickup-requests/{id}/assign
     * Admin/system assigns an active agent in the same city.
     */
    public PickupRequest assignAgent(Long pickupId) {
        PickupRequest pr = getPickupOrThrow(pickupId);
        if (pr.getStatus() != PickupStatus.REQUESTED) {
            throw new BadRequestException("Pickup request is not in REQUESTED status");
        }

        List<CollectionAgent> agents = agentRepo.findByAssignedCityAndIsActive(pr.getCity(), true);
        if (agents.isEmpty()) {
            throw new BadRequestException("No active agents available in city: " + pr.getCity());
        }

        CollectionAgent agent = agents.get(0);
        pr.setAssignedAgentId(agent.getId());
        pr.setStatus(PickupStatus.ASSIGNED);
        return pickupRepo.save(pr);
    }

    /*
     * PUT /api/pickup-requests/{id}/collect
     * Agent marks as collected. This triggers:
     * (a) Adding quantity to the relevant open AggregationBatch for city+wasteType
     * (b) Auto-creating a RewardTransaction and updating RewardBalance
     * (c) Calculating CO2 saved
     */
    @Transactional
    public PickupRequest collectPickup(Long pickupId) {
        PickupRequest pr = getPickupOrThrow(pickupId);
        if (pr.getStatus() != PickupStatus.ASSIGNED) {
            throw new BadRequestException("Pickup request must be ASSIGNED before collection");
        }

        pr.setStatus(PickupStatus.COLLECTED);
        pr.setCollectedAt(LocalDateTime.now());

        // Map PickupWasteType to the aggregation batch's waste type (same enum)
        PickupWasteType wasteType = pr.getWasteType();

        // (a) Add to aggregation batch
        AggregationBatch batch = batchRepo.findByCityAndWasteTypeAndStatus(
                pr.getCity(), wasteType, BatchStatus.COLLECTING)
                .orElseGet(() -> {
                    AggregationBatch newBatch = new AggregationBatch();
                    newBatch.setCity(pr.getCity());
                    newBatch.setWasteType(wasteType);
                    newBatch.setTotalQuantity(0.0);
                    newBatch.setStatus(BatchStatus.COLLECTING);
                    return batchRepo.save(newBatch);
                });

        batch.setTotalQuantity(batch.getTotalQuantity() + pr.getEstimatedQuantity());
        batchRepo.save(batch);

        // (b) Create reward transaction and update balance
        int points = (int) (pr.getEstimatedQuantity() * POINTS_PER_KG);
        RewardTransaction rewardTxn = new RewardTransaction();
        rewardTxn.setHouseholdUserId(pr.getHouseholdUserId());
        rewardTxn.setPickupRequestId(pr.getId());
        rewardTxn.setPointsEarned(points);
        rewardTxnRepo.save(rewardTxn);

        RewardBalance balance = rewardBalanceRepo.findByHouseholdUserId(pr.getHouseholdUserId())
                .orElseGet(() -> {
                    RewardBalance newBalance = new RewardBalance();
                    newBalance.setHouseholdUserId(pr.getHouseholdUserId());
                    newBalance.setTotalPoints(0);
                    newBalance.setRedeemedPoints(0);
                    return rewardBalanceRepo.save(newBalance);
                });
        balance.setTotalPoints(balance.getTotalPoints() + points);
        rewardBalanceRepo.save(balance);

        // (c) Calculate CO2 saved
        double co2 = co2EstimateService.calculateHouseholdCo2Saved(wasteType, pr.getEstimatedQuantity());
        pr.setCo2SavedKg(co2);

        return pickupRepo.save(pr);
    }

    /*
     * GET /api/pickup-requests
     * Admin can see all pickup requests, optionally filtered by city/status.
     */
    public List<PickupRequest> listPickupRequests(String city, PickupStatus status) {
        if (city != null && !city.isBlank() && status != null) {
            return pickupRepo.findByCityAndStatus(city, status);
        }
        if (status != null) {
            return pickupRepo.findByStatus(status);
        }
        return pickupRepo.findAll();
    }

    /*
     * GET /api/pickup-requests/{id}
     */
    public PickupRequest getPickupRequest(Long id) {
        return getPickupOrThrow(id);
    }

    /*
     * GET /api/pickup-requests/user/{userId}
     * Household user's own pickup history.
     */
    public List<PickupRequest> getUserPickups(Long userId) {
        return pickupRepo.findByHouseholdUserId(userId);
    }

    /*
     * POST /api/agents
     * Register a collection agent.
     */
    public CollectionAgent registerAgent(Long userId, String city) {
        if (agentRepo.findByUserId(userId).isPresent()) {
            throw new BadRequestException("Agent already registered for this user");
        }
        CollectionAgent agent = new CollectionAgent();
        agent.setUserId(userId);
        agent.setAssignedCity(city);
        agent.setIsActive(true);
        return agentRepo.save(agent);
    }

    /*
     * GET /api/agents?city=X
     */
    public List<CollectionAgent> listAgents(String city) {
        if (city != null && !city.isBlank()) {
            return agentRepo.findByAssignedCityAndIsActive(city, true);
        }
        return agentRepo.findAll();
    }

    /*
     * GET /api/aggregation-batches?city=X&status=COLLECTING
     * Admin view of batches nearing bulk-sale threshold.
     */
    public List<AggregationBatch> listBatches(String city, BatchStatus status) {
        if (city != null && !city.isBlank() && status != null) {
            return batchRepo.findByCityAndStatus(city, status);
        }
        if (status != null) {
            return batchRepo.findByStatus(status);
        }
        return batchRepo.findAll();
    }

    /*
     * PUT /api/aggregation-batches/{id}/sell
     * Admin marks a batch as sold to a bulk buyer.
     */
    public AggregationBatch sellBatch(Long batchId, SellBatchRequest req) {
        AggregationBatch batch = batchRepo.findById(batchId)
                .orElseThrow(() -> new ResourceNotFoundException("Batch not found with id: " + batchId));
        if (batch.getStatus() != BatchStatus.COLLECTING) {
            throw new BadRequestException("Batch is not in COLLECTING status");
        }
        batch.setStatus(BatchStatus.SOLD);
        batch.setSoldToBuyerId(req.getSoldToBuyerId());
        batch.setSaleAmount(req.getSaleAmount());
        return batchRepo.save(batch);
    }

    /*
     * GET /api/rewards/{householdUserId}
     * User's point balance and history.
     */
    public RewardResponse getRewards(Long householdUserId) {
        RewardBalance balance = rewardBalanceRepo.findByHouseholdUserId(householdUserId)
                .orElseGet(() -> {
                    RewardBalance b = new RewardBalance();
                    b.setHouseholdUserId(householdUserId);
                    b.setTotalPoints(0);
                    b.setRedeemedPoints(0);
                    return rewardBalanceRepo.save(b);
                });
        List<RewardTransaction> history = rewardTxnRepo.findByHouseholdUserIdOrderByCreatedAtDesc(householdUserId);
        return new RewardResponse(
                householdUserId,
                balance.getTotalPoints(),
                balance.getRedeemedPoints(),
                balance.getAvailablePoints(),
                history
        );
    }

    /*
     * GET /api/dashboard/household/{userId}
     * Household user's impact dashboard — waste diverted, CO2 saved, points earned.
     */
    public HouseholdDashboardResponse getHouseholdDashboard(Long userId) {
        List<PickupRequest> allPickups = pickupRepo.findByHouseholdUserId(userId);
        List<PickupRequest> collected = allPickups.stream()
                .filter(p -> p.getStatus() == PickupStatus.COLLECTED)
                .collect(Collectors.toList());

        Double totalWaste = pickupRepo.sumCollectedQuantityByUser(userId);
        Double totalCo2 = pickupRepo.sumCo2SavedByUser(userId);
        RewardBalance balance = rewardBalanceRepo.findByHouseholdUserId(userId).orElse(null);
        int totalPoints = balance != null ? balance.getTotalPoints() : 0;
        int availablePoints = balance != null ? balance.getAvailablePoints() : 0;

        List<HouseholdDashboardResponse.RecentPickupSummary> recentSummaries = new ArrayList<>();
        collected.stream().limit(10).forEach(p -> recentSummaries.add(
                new HouseholdDashboardResponse.RecentPickupSummary(
                        p.getId(),
                        p.getWasteType().name(),
                        p.getEstimatedQuantity(),
                        p.getCo2SavedKg(),
                        p.getCollectedAt()
                )));

        return new HouseholdDashboardResponse(
                userId,
                collected.size(),
                totalWaste,
                totalCo2,
                totalPoints,
                availablePoints,
                recentSummaries
        );
    }

    private PickupRequest getPickupOrThrow(Long id) {
        return pickupRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pickup request not found with id: " + id));
    }
}
