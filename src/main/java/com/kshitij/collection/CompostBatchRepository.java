package com.kshitij.collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CompostBatchRepository extends JpaRepository<CompostBatch, Long> {
    Optional<CompostBatch> findByCityAndStatus(String city, CompostBatchStatus status);
    List<CompostBatch> findByCity(String city);
    List<CompostBatch> findByStatus(CompostBatchStatus status);

    @Query("SELECT COUNT(b) FROM CompostBatch b")
    long countAll();

    @Query("SELECT COUNT(b) FROM CompostBatch b WHERE b.status = 'DISTRIBUTED'")
    long countDistributed();
}
