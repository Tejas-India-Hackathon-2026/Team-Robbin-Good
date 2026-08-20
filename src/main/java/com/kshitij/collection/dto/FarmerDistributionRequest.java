package com.kshitij.collection.dto;

import jakarta.validation.constraints.NotNull;

public class FarmerDistributionRequest {
    @NotNull private String farmerName;
    private String farmerContact;
    @NotNull private Double quantityGiven;

    public String getFarmerName() { return farmerName; }
    public void setFarmerName(String farmerName) { this.farmerName = farmerName; }
    public String getFarmerContact() { return farmerContact; }
    public void setFarmerContact(String farmerContact) { this.farmerContact = farmerContact; }
    public Double getQuantityGiven() { return quantityGiven; }
    public void setQuantityGiven(Double quantityGiven) { this.quantityGiven = quantityGiven; }
}
