package com.kshitij.collection.dto;

import jakarta.validation.constraints.NotNull;

public class CreditWalletRequest {
    @NotNull private Long householdUserId;
    @NotNull private Double amount;
    private String description;

    public Long getHouseholdUserId() { return householdUserId; }
    public void setHouseholdUserId(Long householdUserId) { this.householdUserId = householdUserId; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
