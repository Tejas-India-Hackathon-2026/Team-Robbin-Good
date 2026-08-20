package com.kshitij.collection;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AggregationBatchRepository extends JpaRepository<AggregationBatch, Long> {
    Optional<AggregationBatch> findByCityAndWasteTypeAndStatus(String city, PickupWasteType wasteType, BatchStatus status);
    List<AggregationBatch> findByCityAndStatus(String city, BatchStatus status);
    List<AggregationBatch> findByStatus(BatchStatus status);
}
