package com.kshitij.marketplace;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/*
 * BuyerRequirement — created by a BUSINESS_BUYER to declare what waste they need.
 *
 * JSON shape (POST /api/requirements request):
 * {
 *   "wasteType": "COOKING_OIL",
 *   "requiredQuantity": 200,
 *   "unit": "LITRE",
 *   "maxDistanceKm": 50,
 *   "city": "Bangalore"
 * }
 */
@Entity
@Table(name = "buyer_requirements")
@EntityListeners(AuditingEntityListener.class)
public class BuyerRequirement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long buyerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WasteType wasteType;

    @Column(nullable = false)
    private Double requiredQuantity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ListingUnit unit;

    private Double maxDistanceKm;

    @Column(nullable = false)
    private String city;

    @CreatedDate
    private LocalDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getBuyerId() { return buyerId; }
    public void setBuyerId(Long buyerId) { this.buyerId = buyerId; }
    public WasteType getWasteType() { return wasteType; }
    public void setWasteType(WasteType wasteType) { this.wasteType = wasteType; }
    public Double getRequiredQuantity() { return requiredQuantity; }
    public void setRequiredQuantity(Double requiredQuantity) { this.requiredQuantity = requiredQuantity; }
    public ListingUnit getUnit() { return unit; }
    public void setUnit(ListingUnit unit) { this.unit = unit; }
    public Double getMaxDistanceKm() { return maxDistanceKm; }
    public void setMaxDistanceKm(Double maxDistanceKm) { this.maxDistanceKm = maxDistanceKm; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
