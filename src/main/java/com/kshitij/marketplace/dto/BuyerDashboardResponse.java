package com.kshitij.marketplace.dto;

import java.math.BigDecimal;

/*
 * Response for GET /api/dashboard/buyer/{id}
 * {
 *   "totalWasteBoughtKg": 200.0,
 *   "totalSpent": 2400.00,
 *   "estimatedMarketRateTotal": 3000.00,
 *   "estimatedSavings": 600.00,
 *   "totalCo2SavedKg": 60.0
 * }
 */
public class BuyerDashboardResponse {
    private Double totalWasteBoughtKg;
    private BigDecimal totalSpent;
    private BigDecimal estimatedMarketRateTotal;
    private BigDecimal estimatedSavings;
    private Double totalCo2SavedKg;

    public BuyerDashboardResponse(Double totalWasteBoughtKg, BigDecimal totalSpent,
                                  BigDecimal estimatedMarketRateTotal, BigDecimal estimatedSavings,
                                  Double totalCo2SavedKg) {
        this.totalWasteBoughtKg = totalWasteBoughtKg;
        this.totalSpent = totalSpent;
        this.estimatedMarketRateTotal = estimatedMarketRateTotal;
        this.estimatedSavings = estimatedSavings;
        this.totalCo2SavedKg = totalCo2SavedKg;
    }

    public Double getTotalWasteBoughtKg() { return totalWasteBoughtKg; }
    public BigDecimal getTotalSpent() { return totalSpent; }
    public BigDecimal getEstimatedMarketRateTotal() { return estimatedMarketRateTotal; }
    public BigDecimal getEstimatedSavings() { return estimatedSavings; }
    public Double getTotalCo2SavedKg() { return totalCo2SavedKg; }
}
