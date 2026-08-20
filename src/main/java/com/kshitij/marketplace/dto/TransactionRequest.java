package com.kshitij.marketplace.dto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

/*
 * Request body for POST /api/transactions/request
 * {
 *   "listingId": 1,
 *   "agreedQuantity": 30,
 *   "agreedPrice": 15.00
 * }
 */
public class TransactionRequest {
    @NotNull private Long listingId;
    @NotNull private Double agreedQuantity;
    @NotNull private BigDecimal agreedPrice;

    public Long getListingId() { return listingId; }
    public void setListingId(Long listingId) { this.listingId = listingId; }
    public Double getAgreedQuantity() { return agreedQuantity; }
    public void setAgreedQuantity(Double agreedQuantity) { this.agreedQuantity = agreedQuantity; }
    public BigDecimal getAgreedPrice() { return agreedPrice; }
    public void setAgreedPrice(BigDecimal agreedPrice) { this.agreedPrice = agreedPrice; }
}
