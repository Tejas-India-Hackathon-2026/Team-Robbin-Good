package com.kshitij.admin;

import com.kshitij.admin.dto.AdminDashboardResponse;
import com.kshitij.admin.dto.UserSummary;
import com.kshitij.collection.AggregationBatch;
import com.kshitij.collection.AggregationBatchRepository;
import com.kshitij.collection.CollectionAgent;
import com.kshitij.collection.CompostBatchRepository;
import com.kshitij.collection.PickupRequest;
import com.kshitij.collection.PickupRequestRepository;
import com.kshitij.collection.CollectionAgentRepository;
import com.kshitij.marketplace.*;
import com.kshitij.user.Role;
import com.kshitij.user.User;
import com.kshitij.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {
    private final UserRepository userRepo;
    private final WasteListingRepository listingRepo;
    private final TransactionRepository transactionRepo;
    private final PickupRequestRepository pickupRepo;
    private final CollectionAgentRepository agentRepo;
    private final AggregationBatchRepository batchRepo;
    private final CompostBatchRepository compostBatchRepo;

    public AdminService(UserRepository userRepo,
                        WasteListingRepository listingRepo,
                        TransactionRepository transactionRepo,
                        PickupRequestRepository pickupRepo,
                        CollectionAgentRepository agentRepo,
                        AggregationBatchRepository batchRepo,
                        CompostBatchRepository compostBatchRepo) {
        this.userRepo = userRepo;
        this.listingRepo = listingRepo;
        this.transactionRepo = transactionRepo;
        this.pickupRepo = pickupRepo;
        this.agentRepo = agentRepo;
        this.batchRepo = batchRepo;
        this.compostBatchRepo = compostBatchRepo;
    }

    public AdminDashboardResponse getSystemStats() {
        AdminDashboardResponse stats = new AdminDashboardResponse();

        // User stats
        stats.setTotalUsers(userRepo.count());
        stats.setTotalSellers(userRepo.countByRole(Role.BUSINESS_SELLER));
        stats.setTotalBuyers(userRepo.countByRole(Role.BUSINESS_BUYER));
        stats.setTotalHouseholdUsers(userRepo.countByRole(Role.HOUSEHOLD_USER));
        stats.setTotalAgents(userRepo.countByRole(Role.COLLECTION_AGENT));

        // Listing stats
        stats.setTotalListings(listingRepo.countAll());
        stats.setActiveListings(listingRepo.countActive());

        // Transaction stats
        stats.setTotalTransactions(transactionRepo.countAll());
        stats.setCompletedTransactions(transactionRepo.countCompleted());
        stats.setTotalCommissionEarned(transactionRepo.sumTotalCommission());
        stats.setTotalCo2SavedB2bKg(transactionRepo.sumTotalCo2Saved() != null ? transactionRepo.sumTotalCo2Saved() : 0.0);

        // Pickup stats
        stats.setTotalPickupRequests(pickupRepo.countAll());
        stats.setCollectedPickups(pickupRepo.countCollected());
        stats.setTotalCo2SavedHouseholdKg(pickupRepo.sumTotalCo2Saved() != null ? pickupRepo.sumTotalCo2Saved() : 0.0);
        stats.setTotalWasteCollectedKg(pickupRepo.sumTotalCollectedQuantity() != null ? pickupRepo.sumTotalCollectedQuantity() : 0.0);

        // Batch stats
        stats.setTotalBatches(batchRepo.countAll());
        stats.setSoldBatches(batchRepo.countSold());
        stats.setTotalBatchSaleAmount(batchRepo.sumTotalSaleAmount());

        // Combined CO2
        double b2bCo2 = stats.getTotalCo2SavedB2bKg();
        double hhCo2 = stats.getTotalCo2SavedHouseholdKg();
        stats.setCombinedCo2SavedKg(Math.round((b2bCo2 + hhCo2) * 100.0) / 100.0);

        // Users by city
        List<String> cities = userRepo.findDistinctCities();
        Map<String, Long> usersByCity = new LinkedHashMap<>();
        for (String city : cities) {
            long count = userRepo.findAll().stream()
                    .filter(u -> city.equals(u.getCity()))
                    .count();
            usersByCity.put(city, count);
        }
        stats.setUsersByCity(usersByCity);

        stats.setTotalPayoutsPaid(pickupRepo.sumTotalPayouts());
        stats.setTotalCompostBatches(compostBatchRepo.countAll());
        stats.setDistributedCompostBatches(compostBatchRepo.countDistributed());
        stats.setPendingPickups(pickupRepo.countPending());

        return stats;
    }

    public List<UserSummary> getAllUsers() {
        return userRepo.findAll().stream()
                .map(u -> new UserSummary(u.getId(), u.getName(), u.getEmail(), u.getRole(),
                        u.getPhone(), u.getCity(), u.getAddress(), u.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public List<UserSummary> getUsersByRole(Role role) {
        return userRepo.findByRole(role).stream()
                .map(u -> new UserSummary(u.getId(), u.getName(), u.getEmail(), u.getRole(),
                        u.getPhone(), u.getCity(), u.getAddress(), u.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public List<WasteListing> getAllListings() {
        return listingRepo.findAll();
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepo.findAll();
    }

    public List<PickupRequest> getAllPickups() {
        return pickupRepo.findAll();
    }

    public List<AggregationBatch> getAllBatches() {
        return batchRepo.findAll();
    }

    public List<CollectionAgent> getAllAgents() {
        return agentRepo.findAll();
    }
}
