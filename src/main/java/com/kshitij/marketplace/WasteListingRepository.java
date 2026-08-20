package com.kshitij.marketplace;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WasteListingRepository extends JpaRepository<WasteListing, Long> {
    List<WasteListing> findByWasteTypeAndCityAndStatus(WasteType wasteType, String city, ListingStatus status);
    List<WasteListing> findBySellerId(Long sellerId);
    List<WasteListing> findByCityAndStatus(String city, ListingStatus status);
    List<WasteListing> findByStatus(ListingStatus status);
}
