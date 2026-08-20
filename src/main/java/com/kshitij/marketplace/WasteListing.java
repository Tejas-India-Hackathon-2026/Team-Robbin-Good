package com.kshitij.marketplace;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/*
 * WasteListing — created by a BUSINESS_SELLER to advertise waste they want to dispose of.
 *
 * JSON shape (POST /api/listings request):
 * {
 *   "wasteType": "COOKING_OIL",
 *   "quantity": 50,
 *   "unit": "LITRE",
 *   "frequency": "WEEKLY",
 *   "pricePerUnit": 12.50,      // nullable — buyer can negotiate
 *   "location": "Koramangala",
 *   "city": "Bangalore"
 * }
 */
@Entity
@Table(name = "waste_listings")
@EntityListeners(AuditingEntityListener.class)
public class WasteListing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long sellerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WasteType wasteType;

    @Column(nullable = false)
    private Double quantity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ListingUnit unit;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ListingFrequency frequency;

    @Column(precision = 10, scale = 2)
    private BigDecimal pricePerUnit;

    private String location;

    @Column(nullable = false)
    private String city;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ListingStatus status = ListingStatus.ACTIVE;

    @CreatedDate
    private LocalDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getSellerId() { return sellerId; }
    public void setSellerId(Long sellerId) { this.sellerId = sellerId; }
    public WasteType getWasteType() { return wasteType; }
    public void setWasteType(WasteType wasteType) { this.wasteType = wasteType; }
    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }
    public ListingUnit getUnit() { return unit; }
    public void setUnit(ListingUnit unit) { this.unit = unit; }
    public ListingFrequency getFrequency() { return frequency; }
    public void setFrequency(ListingFrequency frequency) { this.frequency = frequency; }
    public BigDecimal getPricePerUnit() { return pricePerUnit; }
    public void setPricePerUnit(BigDecimal pricePerUnit) { this.pricePerUnit = pricePerUnit; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public ListingStatus getStatus() { return status; }
    public void setStatus(ListingStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
