package com.kshitij.marketplace;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/*
 * Transaction — created when a buyer requests to purchase a listing.
 * Commission is auto-calculated as 6% of agreedPrice on completion.
 *
 * JSON shape (POST /api/transactions/request):
 * {
 *   "listingId": 1,
 *   "agreedQuantity": 30,
 *   "agreedPrice": 15.00
 * }
 */
@Entity
@Table(name = "transactions")
@EntityListeners(AuditingEntityListener.class)
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long listingId;

    @Column(nullable = false)
    private Long buyerId;

    @Column(nullable = false)
    private Long sellerId;

    @Column(nullable = false)
    private Double agreedQuantity;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal agreedPrice;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal commissionAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionStatus status = TransactionStatus.REQUESTED;

    @Column(nullable = false)
    private Double co2SavedKg = 0.0;

    @CreatedDate
    private LocalDateTime createdAt;

    private LocalDateTime completedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getListingId() { return listingId; }
    public void setListingId(Long listingId) { this.listingId = listingId; }
    public Long getBuyerId() { return buyerId; }
    public void setBuyerId(Long buyerId) { this.buyerId = buyerId; }
    public Long getSellerId() { return sellerId; }
    public void setSellerId(Long sellerId) { this.sellerId = sellerId; }
    public Double getAgreedQuantity() { return agreedQuantity; }
    public void setAgreedQuantity(Double agreedQuantity) { this.agreedQuantity = agreedQuantity; }
    public BigDecimal getAgreedPrice() { return agreedPrice; }
    public void setAgreedPrice(BigDecimal agreedPrice) { this.agreedPrice = agreedPrice; }
    public BigDecimal getCommissionAmount() { return commissionAmount; }
    public void setCommissionAmount(BigDecimal commissionAmount) { this.commissionAmount = commissionAmount; }
    public TransactionStatus getStatus() { return status; }
    public void setStatus(TransactionStatus status) { this.status = status; }
    public Double getCo2SavedKg() { return co2SavedKg; }
    public void setCo2SavedKg(Double co2SavedKg) { this.co2SavedKg = co2SavedKg; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
