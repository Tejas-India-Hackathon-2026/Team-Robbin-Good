package com.kshitij.collection.dto;

import jakarta.validation.constraints.NotNull;

/*
 * Request body for PUT /api/aggregation-batches/{id}/sell
 * {
 *   "soldToBuyerId": 5,
 *   "saleAmount": 12500.00
 * }
 */
public class SellBatchRequest {
    @NotNull private Long soldToBuyerId;
    @NotNull private java.math.BigDecimal saleAmount;

    public Long getSoldToBuyerId() { return soldToBuyerId; }
    public void setSoldToBuyerId(Long soldToBuyerId) { this.soldToBuyerId = soldToBuyerId; }
    public java.math.BigDecimal getSaleAmount() { return saleAmount; }
    public void setSaleAmount(java.math.BigDecimal saleAmount) { this.saleAmount = saleAmount; }
}
