package com.kshitij.collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AggregationBatchRepository extends JpaRepository<AggregationBatch, Long> {
    Optional<AggregationBatch> findByCityAndWasteTypeAndStatus(String city, PickupWasteType wasteType, BatchStatus status);
    List<AggregationBatch> findByCityAndStatus(String city, BatchStatus status);
    List<AggregationBatch> findByStatus(BatchStatus status);

    @Query("SELECT COUNT(b) FROM AggregationBatch b")
    long countAll();

    @Query("SELECT COUNT(b) FROM AggregationBatch b WHERE b.status = 'SOLD'")
    long countSold();

    @Query("SELECT COALESCE(SUM(b.saleAmount), 0) FROM AggregationBatch b WHERE b.status = 'SOLD'")
    java.math.BigDecimal sumTotalSaleAmount();
}
