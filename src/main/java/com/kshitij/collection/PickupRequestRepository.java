package com.kshitij.collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PickupRequestRepository extends JpaRepository<PickupRequest, Long> {
    List<PickupRequest> findByHouseholdUserId(Long householdUserId);
    List<PickupRequest> findByStatus(PickupStatus status);
    List<PickupRequest> findByCityAndStatus(String city, PickupStatus status);

    @Query("SELECT COALESCE(SUM(p.estimatedQuantity), 0) FROM PickupRequest p WHERE p.householdUserId = :userId AND p.status = 'COLLECTED'")
    Double sumCollectedQuantityByUser(@Param("userId") Long userId);

    @Query("SELECT COALESCE(SUM(p.co2SavedKg), 0) FROM PickupRequest p WHERE p.householdUserId = :userId AND p.status = 'COLLECTED'")
    Double sumCo2SavedByUser(@Param("userId") Long userId);

    @Query("SELECT COUNT(p) FROM PickupRequest p")
    long countAll();

    @Query("SELECT COUNT(p) FROM PickupRequest p WHERE p.status = 'COLLECTED'")
    long countCollected();

    @Query("SELECT COALESCE(SUM(p.co2SavedKg), 0) FROM PickupRequest p WHERE p.status = 'COLLECTED'")
    Double sumTotalCo2Saved();

    @Query("SELECT COALESCE(SUM(p.estimatedQuantity), 0) FROM PickupRequest p WHERE p.status = 'COLLECTED'")
    Double sumTotalCollectedQuantity();
}
