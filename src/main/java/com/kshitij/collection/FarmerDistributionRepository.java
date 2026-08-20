package com.kshitij.collection;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FarmerDistributionRepository extends JpaRepository<FarmerDistribution, Long> {
    List<FarmerDistribution> findByCompostBatchId(Long compostBatchId);
}
