package com.kshitij.collection;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RewardTransactionRepository extends JpaRepository<RewardTransaction, Long> {
    List<RewardTransaction> findByHouseholdUserIdOrderByCreatedAtDesc(Long householdUserId);
}
