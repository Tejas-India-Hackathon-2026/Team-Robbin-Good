package com.kshitij.marketplace;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySellerId(Long sellerId);
    List<Transaction> findByBuyerId(Long buyerId);

    @Query("SELECT COALESCE(SUM(t.agreedQuantity), 0) FROM Transaction t WHERE t.sellerId = :sellerId AND t.status = 'COMPLETED'")
    Double sumQuantitySoldBySeller(@Param("sellerId") Long sellerId);

    @Query("SELECT COALESCE(SUM(t.agreedPrice), 0) FROM Transaction t WHERE t.sellerId = :sellerId AND t.status = 'COMPLETED'")
    BigDecimal sumEarnedBySeller(@Param("sellerId") Long sellerId);

    @Query("SELECT COALESCE(SUM(t.commissionAmount), 0) FROM Transaction t WHERE t.sellerId = :sellerId AND t.status = 'COMPLETED'")
    BigDecimal sumCommissionBySeller(@Param("sellerId") Long sellerId);

    @Query("SELECT COALESCE(SUM(t.agreedQuantity), 0) FROM Transaction t WHERE t.buyerId = :buyerId AND t.status = 'COMPLETED'")
    Double sumQuantityBoughtByBuyer(@Param("buyerId") Long buyerId);

    @Query("SELECT COALESCE(SUM(t.agreedPrice), 0) FROM Transaction t WHERE t.buyerId = :buyerId AND t.status = 'COMPLETED'")
    BigDecimal sumSpentByBuyer(@Param("buyerId") Long buyerId);

    @Query("SELECT COALESCE(SUM(t.co2SavedKg), 0) FROM Transaction t WHERE t.sellerId = :sellerId AND t.status = 'COMPLETED'")
    Double sumCo2SavedBySeller(@Param("sellerId") Long sellerId);

    @Query("SELECT COALESCE(SUM(t.co2SavedKg), 0) FROM Transaction t WHERE t.buyerId = :buyerId AND t.status = 'COMPLETED'")
    Double sumCo2SavedByBuyer(@Param("buyerId") Long buyerId);
}
