package com.kshitij.collection;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CollectionAgentRepository extends JpaRepository<CollectionAgent, Long> {
    Optional<CollectionAgent> findByUserId(Long userId);
    List<CollectionAgent> findByAssignedCityAndIsActive(String city, Boolean isActive);
}
