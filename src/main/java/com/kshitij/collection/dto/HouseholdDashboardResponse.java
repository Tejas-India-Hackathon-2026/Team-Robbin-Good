package com.kshitij.collection.dto;

import java.util.List;

/*
 * Response for GET /api/dashboard/household/{userId}
 * {
 *   "userId": 12,
 *   "totalPickupsCollected": 8,
 *   "totalWasteHandedOverKg": 42.5,
 *   "totalCo2SavedKg": 85.0,
 *   "totalPointsEarned": 85,
 *   "availablePoints": 60,
 *   "recentPickups": [ { id, wasteType, estimatedQuantity, co2SavedKg, collectedAt }, ... ]
 * }
 */
public class HouseholdDashboardResponse {
    private Long userId;
    private int totalPickupsCollected;
    private Double totalWasteHandedOverKg;
    private Double totalCo2SavedKg;
    private Integer totalPointsEarned;
    private Integer availablePoints;
    private List<RecentPickupSummary> recentPickups;

    public HouseholdDashboardResponse(Long userId, int totalPickupsCollected, Double totalWasteHandedOverKg,
                                      Double totalCo2SavedKg, Integer totalPointsEarned, Integer availablePoints,
                                      List<RecentPickupSummary> recentPickups) {
        this.userId = userId;
        this.totalPickupsCollected = totalPickupsCollected;
        this.totalWasteHandedOverKg = totalWasteHandedOverKg;
        this.totalCo2SavedKg = totalCo2SavedKg;
        this.totalPointsEarned = totalPointsEarned;
        this.availablePoints = availablePoints;
        this.recentPickups = recentPickups;
    }

    public Long getUserId() { return userId; }
    public int getTotalPickupsCollected() { return totalPickupsCollected; }
    public Double getTotalWasteHandedOverKg() { return totalWasteHandedOverKg; }
    public Double getTotalCo2SavedKg() { return totalCo2SavedKg; }
    public Integer getTotalPointsEarned() { return totalPointsEarned; }
    public Integer getAvailablePoints() { return availablePoints; }
    public List<RecentPickupSummary> getRecentPickups() { return recentPickups; }

    public static class RecentPickupSummary {
        private Long id;
        private String wasteType;
        private Double estimatedQuantity;
        private Double co2SavedKg;
        private java.time.LocalDateTime collectedAt;

        public RecentPickupSummary(Long id, String wasteType, Double estimatedQuantity,
                                   Double co2SavedKg, java.time.LocalDateTime collectedAt) {
            this.id = id;
            this.wasteType = wasteType;
            this.estimatedQuantity = estimatedQuantity;
            this.co2SavedKg = co2SavedKg;
            this.collectedAt = collectedAt;
        }

        public Long getId() { return id; }
        public String getWasteType() { return wasteType; }
        public Double getEstimatedQuantity() { return estimatedQuantity; }
        public Double getCo2SavedKg() { return co2SavedKg; }
        public java.time.LocalDateTime getCollectedAt() { return collectedAt; }
    }
}
