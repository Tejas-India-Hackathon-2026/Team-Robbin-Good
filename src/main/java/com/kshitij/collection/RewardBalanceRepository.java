package com.kshitij.collection;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RewardBalanceRepository extends JpaRepository<RewardBalance, Long> {
    Optional<RewardBalance> findByHouseholdUserId(Long householdUserId);
}
