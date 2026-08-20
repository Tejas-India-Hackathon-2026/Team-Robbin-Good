package com.kshitij.collection;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/*
 * AggregationBatch — collects pickup waste of the same type in the same city.
 * Once volume is sufficient, an admin sells the batch to a bulk buyer.
 *
 * JSON shape (PUT /api/aggregation-batches/{id}/sell):
 * {
 *   "soldToBuyerId": 5,
 *   "saleAmount": 12500.00
 * }
 */
@Entity
@Table(name = "aggregation_batches")
@EntityListeners(AuditingEntityListener.class)
public class AggregationBatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String city;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PickupWasteType wasteType;

    @Column(nullable = false)
    private Double totalQuantity = 0.0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BatchStatus status = BatchStatus.COLLECTING;

    private Long soldToBuyerId;

    private BigDecimal saleAmount;

    @CreatedDate
    private LocalDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public PickupWasteType getWasteType() { return wasteType; }
    public void setWasteType(PickupWasteType wasteType) { this.wasteType = wasteType; }
    public Double getTotalQuantity() { return totalQuantity; }
    public void setTotalQuantity(Double totalQuantity) { this.totalQuantity = totalQuantity; }
    public BatchStatus getStatus() { return status; }
    public void setStatus(BatchStatus status) { this.status = status; }
    public Long getSoldToBuyerId() { return soldToBuyerId; }
    public void setSoldToBuyerId(Long soldToBuyerId) { this.soldToBuyerId = soldToBuyerId; }
    public BigDecimal getSaleAmount() { return saleAmount; }
    public void setSaleAmount(BigDecimal saleAmount) { this.saleAmount = saleAmount; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
