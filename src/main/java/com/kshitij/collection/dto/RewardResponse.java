package com.kshitij.collection.dto;

import com.kshitij.collection.RewardTransaction;
import java.util.List;

/*
 * Response for GET /api/rewards/{householdUserId}
 * {
 *   "userId": 12,
 *   "totalPoints": 200,
 *   "redeemedPoints": 50,
 *   "availablePoints": 150,
 *   "history": [ { id, pickupRequestId, pointsEarned, createdAt }, ... ]
 * }
 */
public class RewardResponse {
    private Long userId;
    private Integer totalPoints;
    private Integer redeemedPoints;
    private Integer availablePoints;
    private List<RewardTransaction> history;

    public RewardResponse(Long userId, Integer totalPoints, Integer redeemedPoints,
                          Integer availablePoints, List<RewardTransaction> history) {
        this.userId = userId;
        this.totalPoints = totalPoints;
        this.redeemedPoints = redeemedPoints;
        this.availablePoints = availablePoints;
        this.history = history;
    }

    public Long getUserId() { return userId; }
    public Integer getTotalPoints() { return totalPoints; }
    public Integer getRedeemedPoints() { return redeemedPoints; }
    public Integer getAvailablePoints() { return availablePoints; }
    public List<RewardTransaction> getHistory() { return history; }
}
