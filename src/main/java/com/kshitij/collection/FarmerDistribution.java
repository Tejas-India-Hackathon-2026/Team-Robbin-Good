package com.kshitij.collection;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "farmer_distributions")
@EntityListeners(AuditingEntityListener.class)
public class FarmerDistribution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long compostBatchId;

    @Column(nullable = false)
    private String farmerName;

    private String farmerContact;

    @Column(nullable = false)
    private Double quantityGiven;

    @CreatedDate
    private LocalDateTime distributedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getCompostBatchId() { return compostBatchId; }
    public void setCompostBatchId(Long compostBatchId) { this.compostBatchId = compostBatchId; }
    public String getFarmerName() { return farmerName; }
    public void setFarmerName(String farmerName) { this.farmerName = farmerName; }
    public String getFarmerContact() { return farmerContact; }
    public void setFarmerContact(String farmerContact) { this.farmerContact = farmerContact; }
    public Double getQuantityGiven() { return quantityGiven; }
    public void setQuantityGiven(Double quantityGiven) { this.quantityGiven = quantityGiven; }
    public LocalDateTime getDistributedAt() { return distributedAt; }
    public void setDistributedAt(LocalDateTime distributedAt) { this.distributedAt = distributedAt; }
}
