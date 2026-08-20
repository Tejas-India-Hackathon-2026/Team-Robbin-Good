package com.kshitij.collection.dto;

import java.math.BigDecimal;
import java.util.List;

/*
 * Response for GET /api/dashboard/household/{userId}
 */
public class HouseholdDashboardResponse {
    private Long userId;
    private int totalPickupsCollected;
    private Double totalWasteHandedOverKg;
    private Double totalCo2SavedKg;
    private Integer totalPointsEarned;
    private Integer availablePoints;
    private BigDecimal walletBalance;
    private BigDecimal walletEarnedLifetime;
    private List<RecentPickupSummary> recentPickups;

    public HouseholdDashboardResponse(Long userId, int totalPickupsCollected, Double totalWasteHandedOverKg,
                                      Double totalCo2SavedKg, Integer totalPointsEarned, Integer availablePoints,
                                      BigDecimal walletBalance, BigDecimal walletEarnedLifetime,
                                      List<RecentPickupSummary> recentPickups) {
        this.userId = userId;
        this.totalPickupsCollected = totalPickupsCollected;
        this.totalWasteHandedOverKg = totalWasteHandedOverKg;
        this.totalCo2SavedKg = totalCo2SavedKg;
        this.totalPointsEarned = totalPointsEarned;
        this.availablePoints = availablePoints;
        this.walletBalance = walletBalance;
        this.walletEarnedLifetime = walletEarnedLifetime;
        this.recentPickups = recentPickups;
    }

    public Long getUserId() { return userId; }
    public int getTotalPickupsCollected() { return totalPickupsCollected; }
    public Double getTotalWasteHandedOverKg() { return totalWasteHandedOverKg; }
    public Double getTotalCo2SavedKg() { return totalCo2SavedKg; }
    public Integer getTotalPointsEarned() { return totalPointsEarned; }
    public Integer getAvailablePoints() { return availablePoints; }
    public BigDecimal getWalletBalance() { return walletBalance; }
    public BigDecimal getWalletEarnedLifetime() { return walletEarnedLifetime; }
    public List<RecentPickupSummary> getRecentPickups() { return recentPickups; }

    public static class RecentPickupSummary {
        private Long id;
        private String wasteType;
        private Double estimatedQuantity;
        private Double actualQuantity;
        private Double co2SavedKg;
        private BigDecimal payoutAmount;
        private String wasteCategory;
        private String subType;
        private java.time.LocalDateTime collectedAt;

        public RecentPickupSummary(Long id, String wasteType, Double estimatedQuantity,
                                   Double actualQuantity, Double co2SavedKg, BigDecimal payoutAmount,
                                   String wasteCategory, String subType,
                                   java.time.LocalDateTime collectedAt) {
            this.id = id;
            this.wasteType = wasteType;
            this.estimatedQuantity = estimatedQuantity;
            this.actualQuantity = actualQuantity;
            this.co2SavedKg = co2SavedKg;
            this.payoutAmount = payoutAmount;
            this.wasteCategory = wasteCategory;
            this.subType = subType;
            this.collectedAt = collectedAt;
        }

        public Long getId() { return id; }
        public String getWasteType() { return wasteType; }
        public Double getEstimatedQuantity() { return estimatedQuantity; }
        public Double getActualQuantity() { return actualQuantity; }
        public Double getCo2SavedKg() { return co2SavedKg; }
        public BigDecimal getPayoutAmount() { return payoutAmount; }
        public String getWasteCategory() { return wasteCategory; }
        public String getSubType() { return subType; }
        public java.time.LocalDateTime getCollectedAt() { return collectedAt; }
    }
}
