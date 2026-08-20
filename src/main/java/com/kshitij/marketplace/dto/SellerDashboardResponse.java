package com.kshitij.marketplace.dto;

import java.math.BigDecimal;

/*
 * Response for GET /api/dashboard/seller/{id}
 * {
 *   "totalWasteSoldKg": 150.0,
 *   "totalEarned": 1800.00,
 *   "totalCommissionPaid": 108.00,
 *   "totalCo2SavedKg": 45.5
 * }
 */
public class SellerDashboardResponse {
    private Double totalWasteSoldKg;
    private BigDecimal totalEarned;
    private BigDecimal totalCommissionPaid;
    private Double totalCo2SavedKg;

    public SellerDashboardResponse(Double totalWasteSoldKg, BigDecimal totalEarned,
                                   BigDecimal totalCommissionPaid, Double totalCo2SavedKg) {
        this.totalWasteSoldKg = totalWasteSoldKg;
        this.totalEarned = totalEarned;
        this.totalCommissionPaid = totalCommissionPaid;
        this.totalCo2SavedKg = totalCo2SavedKg;
    }

    public Double getTotalWasteSoldKg() { return totalWasteSoldKg; }
    public BigDecimal getTotalEarned() { return totalEarned; }
    public BigDecimal getTotalCommissionPaid() { return totalCommissionPaid; }
    public Double getTotalCo2SavedKg() { return totalCo2SavedKg; }
}
