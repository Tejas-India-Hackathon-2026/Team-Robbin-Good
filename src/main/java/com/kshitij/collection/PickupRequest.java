package com.kshitij.collection;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/*
 * PickupRequest — a household user asks for waste to be collected.
 *
 * JSON shape (POST /api/pickup-requests):
 * {
 *   "wasteType": "PLASTIC",
 *   "estimatedQuantity": 5.5,
 *   "unit": "KG",
 *   "address": "12 MG Road, Indiranagar",
 *   "city": "Bangalore"
 * }
 */
@Entity
@Table(name = "pickup_requests")
@EntityListeners(AuditingEntityListener.class)
public class PickupRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long householdUserId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PickupWasteType wasteType;

    @Column(nullable = false)
    private Double estimatedQuantity;

    @Column(nullable = false)
    private String unit;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String city;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PickupStatus status = PickupStatus.REQUESTED;

    private Long assignedAgentId;

    @Column(nullable = false)
    private Double co2SavedKg = 0.0;

    @Enumerated(EnumType.STRING)
    private WasteCategory wasteCategory;

    @Enumerated(EnumType.STRING)
    private SubType subType;

    private Double actualQuantity;

    private BigDecimal payoutAmount;

    @CreatedDate
    private LocalDateTime requestedAt;

    private LocalDateTime collectedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getHouseholdUserId() { return householdUserId; }
    public void setHouseholdUserId(Long householdUserId) { this.householdUserId = householdUserId; }
    public PickupWasteType getWasteType() { return wasteType; }
    public void setWasteType(PickupWasteType wasteType) { this.wasteType = wasteType; }
    public Double getEstimatedQuantity() { return estimatedQuantity; }
    public void setEstimatedQuantity(Double estimatedQuantity) { this.estimatedQuantity = estimatedQuantity; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public PickupStatus getStatus() { return status; }
    public void setStatus(PickupStatus status) { this.status = status; }
    public Long getAssignedAgentId() { return assignedAgentId; }
    public void setAssignedAgentId(Long assignedAgentId) { this.assignedAgentId = assignedAgentId; }
    public Double getCo2SavedKg() { return co2SavedKg; }
    public void setCo2SavedKg(Double co2SavedKg) { this.co2SavedKg = co2SavedKg; }
    public LocalDateTime getRequestedAt() { return requestedAt; }
    public void setRequestedAt(LocalDateTime requestedAt) { this.requestedAt = requestedAt; }
    public LocalDateTime getCollectedAt() { return collectedAt; }
    public void setCollectedAt(LocalDateTime collectedAt) { this.collectedAt = collectedAt; }
    public WasteCategory getWasteCategory() { return wasteCategory; }
    public void setWasteCategory(WasteCategory wasteCategory) { this.wasteCategory = wasteCategory; }
    public SubType getSubType() { return subType; }
    public void setSubType(SubType subType) { this.subType = subType; }
    public Double getActualQuantity() { return actualQuantity; }
    public void setActualQuantity(Double actualQuantity) { this.actualQuantity = actualQuantity; }
    public BigDecimal getPayoutAmount() { return payoutAmount; }
    public void setPayoutAmount(BigDecimal payoutAmount) { this.payoutAmount = payoutAmount; }
}
