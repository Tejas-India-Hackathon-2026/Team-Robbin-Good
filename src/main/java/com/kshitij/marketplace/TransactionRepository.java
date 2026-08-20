package com.kshitij.marketplace;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySellerIdOrderByCreatedAtDesc(Long sellerId);
    List<Transaction> findByBuyerIdOrderByCreatedAtDesc(Long buyerId);
    List<Transaction> findByStatus(TransactionStatus status);

    // Dashboard queries — sum of (quantity × price per unit) = actual total value
    @Query("SELECT COALESCE(SUM(t.agreedQuantity), 0) FROM Transaction t WHERE t.sellerId = :sellerId AND t.status IN ('REQUESTED','ACCEPTED','PICKED_UP','COMPLETED')")
    Double sumQuantitySoldBySeller(@Param("sellerId") Long sellerId);

    @Query("SELECT COALESCE(SUM(t.agreedQuantity * t.agreedPrice), 0) FROM Transaction t WHERE t.sellerId = :sellerId AND t.status IN ('REQUESTED','ACCEPTED','PICKED_UP','COMPLETED')")
    BigDecimal sumEarnedBySeller(@Param("sellerId") Long sellerId);

    @Query("SELECT COALESCE(SUM(t.commissionAmount), 0) FROM Transaction t WHERE t.sellerId = :sellerId AND t.status IN ('REQUESTED','ACCEPTED','PICKED_UP','COMPLETED')")
    BigDecimal sumCommissionBySeller(@Param("sellerId") Long sellerId);

    @Query("SELECT COALESCE(SUM(t.agreedQuantity), 0) FROM Transaction t WHERE t.buyerId = :buyerId AND t.status IN ('REQUESTED','ACCEPTED','PICKED_UP','COMPLETED')")
    Double sumQuantityBoughtByBuyer(@Param("buyerId") Long buyerId);

    @Query("SELECT COALESCE(SUM(t.agreedQuantity * t.agreedPrice), 0) FROM Transaction t WHERE t.buyerId = :buyerId AND t.status IN ('REQUESTED','ACCEPTED','PICKED_UP','COMPLETED')")
    BigDecimal sumSpentByBuyer(@Param("buyerId") Long buyerId);

    @Query("SELECT COALESCE(SUM(t.co2SavedKg), 0) FROM Transaction t WHERE t.sellerId = :sellerId AND t.status IN ('REQUESTED','ACCEPTED','PICKED_UP','COMPLETED')")
    Double sumCo2SavedBySeller(@Param("sellerId") Long sellerId);

    @Query("SELECT COALESCE(SUM(t.co2SavedKg), 0) FROM Transaction t WHERE t.buyerId = :buyerId AND t.status IN ('REQUESTED','ACCEPTED','PICKED_UP','COMPLETED')")
    Double sumCo2SavedByBuyer(@Param("buyerId") Long buyerId);

    // Admin queries
    @Query("SELECT COUNT(t) FROM Transaction t")
    long countAll();

    @Query("SELECT COUNT(t) FROM Transaction t WHERE t.status = 'COMPLETED'")
    long countCompleted();

    @Query("SELECT COALESCE(SUM(t.commissionAmount), 0) FROM Transaction t WHERE t.status = 'COMPLETED'")
    BigDecimal sumTotalCommission();

    @Query("SELECT COALESCE(SUM(t.co2SavedKg), 0) FROM Transaction t WHERE t.status = 'COMPLETED'")
    Double sumTotalCo2Saved();
}
