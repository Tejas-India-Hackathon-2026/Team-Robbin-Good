package com.kshitij.collection;

import com.kshitij.collection.dto.*;
import com.kshitij.impact.Co2EstimateService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CollectionService {
    private final PickupRequestRepository pickupRepo;
    private final CollectionAgentRepository agentRepo;
    private final WalletBalanceRepository walletBalanceRepo;
    private final WalletTransactionRepository walletTxnRepo;
    private final AggregationBatchRepository aggregationBatchRepo;
    private final CompostBatchRepository compostBatchRepo;
    private final FarmerDistributionRepository farmerDistRepo;
    private final PayoutCalculationService payoutService;
    private final Co2EstimateService co2Service;

    public CollectionService(PickupRequestRepository pickupRepo,
                             CollectionAgentRepository agentRepo,
                             WalletBalanceRepository walletBalanceRepo,
                             WalletTransactionRepository walletTxnRepo,
                             AggregationBatchRepository aggregationBatchRepo,
                             CompostBatchRepository compostBatchRepo,
                             FarmerDistributionRepository farmerDistRepo,
                             PayoutCalculationService payoutService,
                             Co2EstimateService co2Service) {
        this.pickupRepo = pickupRepo;
        this.agentRepo = agentRepo;
        this.walletBalanceRepo = walletBalanceRepo;
        this.walletTxnRepo = walletTxnRepo;
        this.aggregationBatchRepo = aggregationBatchRepo;
        this.compostBatchRepo = compostBatchRepo;
        this.farmerDistRepo = farmerDistRepo;
        this.payoutService = payoutService;
        this.co2Service = co2Service;
    }

    public PickupRequest createPickupRequest(CreatePickupRequest req) {
        PickupRequest pr = new PickupRequest();
        pr.setHouseholdUserId(1L);
        pr.setWasteType(req.getWasteType());
        pr.setEstimatedQuantity(req.getEstimatedQuantity());
        pr.setUnit(req.getUnit());
        pr.setAddress(req.getAddress());
        pr.setCity(req.getCity());
        pr.setStatus(PickupStatus.REQUESTED);
        return pickupRepo.save(pr);
    }

    public PickupRequest getPickupRequest(Long id) {
        return pickupRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Pickup not found: " + id));
    }

    public List<PickupRequest> getPickupsByHousehold(Long householdUserId) {
        return pickupRepo.findByHouseholdUserIdOrderByRequestedAtDesc(householdUserId);
    }

    public List<PickupRequest> getPickupsForAgent(Long userId) {
        CollectionAgent agent = agentRepo.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("No agent profile found for user: " + userId));

        List<PickupRequest> assigned = pickupRepo.findByAssignedAgentIdOrderByRequestedAtDesc(agent.getId());
        List<PickupRequest> cityAvailable = pickupRepo.findByCityAndStatusOrderByRequestedAtDesc(
            agent.getAssignedCity(), PickupStatus.REQUESTED);

        java.util.LinkedHashMap<Long, PickupRequest> merged = new java.util.LinkedHashMap<>();
        cityAvailable.forEach(p -> merged.put(p.getId(), p));
        assigned.forEach(p -> merged.put(p.getId(), p));
        return new java.util.ArrayList<>(merged.values());
    }

    public PickupRequest claimPickup(Long pickupId, Long userId) {
        CollectionAgent agent = agentRepo.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("No agent profile found for user: " + userId));
        PickupRequest pr = getPickupRequest(pickupId);
        if (pr.getStatus() != PickupStatus.REQUESTED) {
            throw new RuntimeException("Pickup is not available for claiming");
        }
        pr.setAssignedAgentId(agent.getId());
        pr.setStatus(PickupStatus.ASSIGNED);
        return pickupRepo.save(pr);
    }

    public List<PickupRequest> getRequestedPickups() {
        return pickupRepo.findByStatusOrderByRequestedAtDesc(PickupStatus.REQUESTED);
    }

    public PickupRequest assignAgent(Long pickupId, Long agentId) {
        PickupRequest pr = getPickupRequest(pickupId);
        if (pr.getStatus() != PickupStatus.REQUESTED) {
            throw new RuntimeException("Pickup is not in REQUESTED status");
        }
        CollectionAgent agent = agentRepo.findById(agentId)
            .orElseThrow(() -> new RuntimeException("Agent not found: " + agentId));
        pr.setAssignedAgentId(agentId);
        pr.setStatus(PickupStatus.ASSIGNED);
        return pickupRepo.save(pr);
    }

    public PickupRequest collectPickup(Long pickupId, CollectPickupRequest req) {
        PickupRequest pr = getPickupRequest(pickupId);

        pr.setActualQuantity(req.getActualQuantity());
        pr.setWasteCategory(req.getWasteCategory());
        pr.setSubType(req.getSubType());

        double co2Saved = co2Service.calculateHouseholdCo2Saved(pr.getWasteType(), req.getActualQuantity());
        pr.setCo2SavedKg(co2Saved);

        BigDecimal payout = payoutService.getPayout(req.getSubType(), req.getActualQuantity());
        pr.setPayoutAmount(payout);
        pr.setStatus(PickupStatus.PAID_OUT);
        pr.setCollectedAt(LocalDateTime.now());
        pickupRepo.save(pr);

        WalletBalance wallet = walletBalanceRepo.findByHouseholdUserId(pr.getHouseholdUserId())
            .orElseGet(() -> {
                WalletBalance wb = new WalletBalance();
                wb.setHouseholdUserId(pr.getHouseholdUserId());
                return wb;
            });
        wallet.setTotalBalance(wallet.getTotalBalance().add(payout));
        wallet.setTotalEarnedLifetime(wallet.getTotalEarnedLifetime().add(payout));
        walletBalanceRepo.save(wallet);

        WalletTransaction txn = new WalletTransaction();
        txn.setHouseholdUserId(pr.getHouseholdUserId());
        txn.setPickupRequestId(pr.getId());
        txn.setAmount(payout);
        txn.setDescription("Payout for " + req.getActualQuantity() + "kg " + req.getSubType() + " waste");
        walletTxnRepo.save(txn);

        if (req.getWasteCategory() == WasteCategory.BIODEGRADABLE) {
            compostBatchRepo.findByCityAndStatus(pr.getCity(), CompostBatchStatus.COLLECTING)
                .ifPresentOrElse(
                    batch -> {
                        batch.setTotalQuantity(batch.getTotalQuantity() + req.getActualQuantity());
                        compostBatchRepo.save(batch);
                    },
                    () -> {
                        CompostBatch newBatch = new CompostBatch();
                        newBatch.setCity(pr.getCity());
                        newBatch.setTotalQuantity(req.getActualQuantity());
                        compostBatchRepo.save(newBatch);
                    }
                );
        } else {
            aggregationBatchRepo.findByCityAndWasteTypeAndStatus(pr.getCity(), pr.getWasteType(), BatchStatus.COLLECTING)
                .ifPresentOrElse(
                    batch -> {
                        batch.setTotalQuantity(batch.getTotalQuantity() + req.getActualQuantity());
                        aggregationBatchRepo.save(batch);
                    },
                    () -> {
                        AggregationBatch newBatch = new AggregationBatch();
                        newBatch.setCity(pr.getCity());
                        newBatch.setWasteType(pr.getWasteType());
                        newBatch.setTotalQuantity(req.getActualQuantity());
                        aggregationBatchRepo.save(newBatch);
                    }
                );
        }

        return pr;
    }

    public PickupRequest cancelPickup(Long pickupId) {
        PickupRequest pr = getPickupRequest(pickupId);
        if (pr.getStatus() == PickupStatus.PAID_OUT) {
            throw new RuntimeException("Cannot cancel a paid-out pickup");
        }
        pr.setStatus(PickupStatus.CANCELLED);
        return pickupRepo.save(pr);
    }

    public HouseholdDashboardResponse getHouseholdDashboard(Long userId) {
        List<PickupRequest> allPickups = pickupRepo.findByHouseholdUserIdOrderByRequestedAtDesc(userId);
        long collectedCount = allPickups.stream()
            .filter(p -> p.getStatus() == PickupStatus.COLLECTED || p.getStatus() == PickupStatus.PAID_OUT)
            .count();
        double totalWaste = allPickups.stream()
            .filter(p -> p.getStatus() == PickupStatus.COLLECTED || p.getStatus() == PickupStatus.PAID_OUT)
            .mapToDouble(p -> p.getActualQuantity() != null ? p.getActualQuantity() : p.getEstimatedQuantity())
            .sum();
        double totalCo2 = allPickups.stream()
            .filter(p -> p.getStatus() == PickupStatus.COLLECTED || p.getStatus() == PickupStatus.PAID_OUT)
            .mapToDouble(p -> p.getCo2SavedKg() != null ? p.getCo2SavedKg() : 0.0)
            .sum();
        BigDecimal totalEarned = pickupRepo.sumTotalPayoutsByUser(userId);
        WalletBalance wallet = getWallet(userId);

        List<HouseholdDashboardResponse.RecentPickupSummary> recentPickups = allPickups.stream()
            .limit(5)
            .map(p -> new HouseholdDashboardResponse.RecentPickupSummary(
                p.getId(),
                p.getWasteType() != null ? p.getWasteType().name() : null,
                p.getEstimatedQuantity(),
                p.getActualQuantity(),
                p.getCo2SavedKg(),
                p.getPayoutAmount(),
                p.getWasteCategory() != null ? p.getWasteCategory().name() : null,
                p.getSubType() != null ? p.getSubType().name() : null,
                p.getCollectedAt()
            ))
            .collect(Collectors.toList());

        return new HouseholdDashboardResponse(
            userId,
            (int) collectedCount,
            totalWaste,
            Math.round(totalCo2 * 100.0) / 100.0,
            0,
            0,
            wallet.getTotalBalance(),
            wallet.getTotalEarnedLifetime(),
            recentPickups
        );
    }

    public WalletBalance getWallet(Long householdUserId) {
        return walletBalanceRepo.findByHouseholdUserId(householdUserId)
            .orElseGet(() -> {
                WalletBalance wb = new WalletBalance();
                wb.setHouseholdUserId(householdUserId);
                return wb;
            });
    }

    public List<WalletTransaction> getWalletTransactions(Long householdUserId) {
        return walletTxnRepo.findByHouseholdUserIdOrderByCreatedAtDesc(householdUserId);
    }

    public List<CompostBatch> getAllCompostBatches() {
        return compostBatchRepo.findAll();
    }

    public List<CompostBatch> getCompostBatchesByCity(String city) {
        return compostBatchRepo.findByCity(city);
    }

    public FarmerDistribution distributeCompost(Long compostBatchId, FarmerDistributionRequest req) {
        CompostBatch batch = compostBatchRepo.findById(compostBatchId)
            .orElseThrow(() -> new RuntimeException("Compost batch not found: " + compostBatchId));
        if (batch.getStatus() == CompostBatchStatus.DISTRIBUTED) {
            throw new RuntimeException("Batch already fully distributed");
        }
        if (req.getQuantityGiven() > batch.getTotalQuantity()) {
            throw new RuntimeException("Distribution quantity exceeds batch total");
        }
        FarmerDistribution dist = new FarmerDistribution();
        dist.setCompostBatchId(compostBatchId);
        dist.setFarmerName(req.getFarmerName());
        dist.setFarmerContact(req.getFarmerContact());
        dist.setQuantityGiven(req.getQuantityGiven());
        farmerDistRepo.save(dist);

        batch.setTotalQuantity(batch.getTotalQuantity() - req.getQuantityGiven());
        if (batch.getTotalQuantity() <= 0.001) {
            batch.setStatus(CompostBatchStatus.DISTRIBUTED);
        } else {
            batch.setStatus(CompostBatchStatus.READY_FOR_DISTRIBUTION);
        }
        compostBatchRepo.save(batch);

        return dist;
    }

    public List<FarmerDistribution> getDistributions(Long compostBatchId) {
        return farmerDistRepo.findByCompostBatchId(compostBatchId);
    }
}
