package com.kshitij.collection;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/*
 * RewardTransaction — points earned by a household user for handing over waste.
 * Calculated as 2 points per kg collected.
 */
@Entity
@Table(name = "reward_transactions")
@EntityListeners(AuditingEntityListener.class)
public class RewardTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long householdUserId;

    @Column(nullable = false)
    private Long pickupRequestId;

    @Column(nullable = false)
    private Integer pointsEarned;

    @CreatedDate
    private LocalDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getHouseholdUserId() { return householdUserId; }
    public void setHouseholdUserId(Long householdUserId) { this.householdUserId = householdUserId; }
    public Long getPickupRequestId() { return pickupRequestId; }
    public void setPickupRequestId(Long pickupRequestId) { this.pickupRequestId = pickupRequestId; }
    public Integer getPointsEarned() { return pointsEarned; }
    public void setPointsEarned(Integer pointsEarned) { this.pointsEarned = pointsEarned; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
