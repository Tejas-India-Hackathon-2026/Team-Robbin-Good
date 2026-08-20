package com.kshitij.collection;

import jakarta.persistence.*;

/*
 * RewardBalance — tracks total and redeemed points for a household user.
 */
@Entity
@Table(name = "reward_balances")
public class RewardBalance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long householdUserId;

    @Column(nullable = false)
    private Integer totalPoints = 0;

    @Column(nullable = false)
    private Integer redeemedPoints = 0;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getHouseholdUserId() { return householdUserId; }
    public void setHouseholdUserId(Long householdUserId) { this.householdUserId = householdUserId; }
    public Integer getTotalPoints() { return totalPoints; }
    public void setTotalPoints(Integer totalPoints) { this.totalPoints = totalPoints; }
    public Integer getRedeemedPoints() { return redeemedPoints; }
    public void setRedeemedPoints(Integer redeemedPoints) { this.redeemedPoints = redeemedPoints; }

    public Integer getAvailablePoints() { return totalPoints - redeemedPoints; }
}
