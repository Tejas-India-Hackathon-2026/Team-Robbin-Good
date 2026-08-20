package com.kshitij.admin.dto;

import java.math.BigDecimal;
import java.util.Map;

/*
 * Response for GET /api/admin/stats
 * System-wide overview for the admin dashboard.
 */
public class AdminDashboardResponse {
    private long totalUsers;
    private long totalSellers;
    private long totalBuyers;
    private long totalHouseholdUsers;
    private long totalAgents;
    private long totalListings;
    private long activeListings;
    private long totalTransactions;
    private long completedTransactions;
    private BigDecimal totalCommissionEarned;
    private double totalCo2SavedB2bKg;
    private long totalPickupRequests;
    private long collectedPickups;
    private double totalCo2SavedHouseholdKg;
    private double totalWasteCollectedKg;
    private long totalBatches;
    private long soldBatches;
    private BigDecimal totalBatchSaleAmount;
    private double combinedCo2SavedKg;
    private Map<String, Long> usersByCity;

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }
    public long getTotalSellers() { return totalSellers; }
    public void setTotalSellers(long totalSellers) { this.totalSellers = totalSellers; }
    public long getTotalBuyers() { return totalBuyers; }
    public void setTotalBuyers(long totalBuyers) { this.totalBuyers = totalBuyers; }
    public long getTotalHouseholdUsers() { return totalHouseholdUsers; }
    public void setTotalHouseholdUsers(long totalHouseholdUsers) { this.totalHouseholdUsers = totalHouseholdUsers; }
    public long getTotalAgents() { return totalAgents; }
    public void setTotalAgents(long totalAgents) { this.totalAgents = totalAgents; }
    public long getTotalListings() { return totalListings; }
    public void setTotalListings(long totalListings) { this.totalListings = totalListings; }
    public long getActiveListings() { return activeListings; }
    public void setActiveListings(long activeListings) { this.activeListings = activeListings; }
    public long getTotalTransactions() { return totalTransactions; }
    public void setTotalTransactions(long totalTransactions) { this.totalTransactions = totalTransactions; }
    public long getCompletedTransactions() { return completedTransactions; }
    public void setCompletedTransactions(long completedTransactions) { this.completedTransactions = completedTransactions; }
    public BigDecimal getTotalCommissionEarned() { return totalCommissionEarned; }
    public void setTotalCommissionEarned(BigDecimal totalCommissionEarned) { this.totalCommissionEarned = totalCommissionEarned; }
    public double getTotalCo2SavedB2bKg() { return totalCo2SavedB2bKg; }
    public void setTotalCo2SavedB2bKg(double totalCo2SavedB2bKg) { this.totalCo2SavedB2bKg = totalCo2SavedB2bKg; }
    public long getTotalPickupRequests() { return totalPickupRequests; }
    public void setTotalPickupRequests(long totalPickupRequests) { this.totalPickupRequests = totalPickupRequests; }
    public long getCollectedPickups() { return collectedPickups; }
    public void setCollectedPickups(long collectedPickups) { this.collectedPickups = collectedPickups; }
    public double getTotalCo2SavedHouseholdKg() { return totalCo2SavedHouseholdKg; }
    public void setTotalCo2SavedHouseholdKg(double totalCo2SavedHouseholdKg) { this.totalCo2SavedHouseholdKg = totalCo2SavedHouseholdKg; }
    public double getTotalWasteCollectedKg() { return totalWasteCollectedKg; }
    public void setTotalWasteCollectedKg(double totalWasteCollectedKg) { this.totalWasteCollectedKg = totalWasteCollectedKg; }
    public long getTotalBatches() { return totalBatches; }
    public void setTotalBatches(long totalBatches) { this.totalBatches = totalBatches; }
    public long getSoldBatches() { return soldBatches; }
    public void setSoldBatches(long soldBatches) { this.soldBatches = soldBatches; }
    public BigDecimal getTotalBatchSaleAmount() { return totalBatchSaleAmount; }
    public void setTotalBatchSaleAmount(BigDecimal totalBatchSaleAmount) { this.totalBatchSaleAmount = totalBatchSaleAmount; }
    public double getCombinedCo2SavedKg() { return combinedCo2SavedKg; }
    public void setCombinedCo2SavedKg(double combinedCo2SavedKg) { this.combinedCo2SavedKg = combinedCo2SavedKg; }
    public Map<String, Long> getUsersByCity() { return usersByCity; }
    public void setUsersByCity(Map<String, Long> usersByCity) { this.usersByCity = usersByCity; }
}
