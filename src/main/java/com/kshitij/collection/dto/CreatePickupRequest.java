package com.kshitij.collection.dto;

import com.kshitij.collection.PickupWasteType;
import jakarta.validation.constraints.NotNull;

/*
 * Request body for POST /api/pickup-requests
 * {
 *   "wasteType": "PLASTIC",
 *   "estimatedQuantity": 5.5,
 *   "unit": "KG",
 *   "address": "12 MG Road, Indiranagar",
 *   "city": "Bangalore"
 * }
 */
public class CreatePickupRequest {
    @NotNull private PickupWasteType wasteType;
    @NotNull private Double estimatedQuantity;
    @NotNull private String unit;
    @NotNull private String address;
    @NotNull private String city;

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
}
