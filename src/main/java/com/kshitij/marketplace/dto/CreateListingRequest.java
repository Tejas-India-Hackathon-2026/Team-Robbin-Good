package com.kshitij.marketplace.dto;

import com.kshitij.marketplace.ListingFrequency;
import com.kshitij.marketplace.ListingUnit;
import com.kshitij.marketplace.WasteType;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

/*
 * Request body for POST /api/listings
 * {
 *   "wasteType": "COOKING_OIL",
 *   "quantity": 50,
 *   "unit": "LITRE",
 *   "frequency": "WEEKLY",
 *   "pricePerUnit": 12.50,
 *   "location": "Koramangala",
 *   "city": "Bangalore"
 * }
 */
public class CreateListingRequest {
    @NotNull private WasteType wasteType;
    @NotNull private Double quantity;
    @NotNull private ListingUnit unit;
    @NotNull private ListingFrequency frequency;
    private BigDecimal pricePerUnit;
    private String location;
    @NotNull private String city;

    public WasteType getWasteType() { return wasteType; }
    public void setWasteType(WasteType wasteType) { this.wasteType = wasteType; }
    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }
    public ListingUnit getUnit() { return unit; }
    public void setUnit(ListingUnit unit) { this.unit = unit; }
    public ListingFrequency getFrequency() { return frequency; }
    public void setFrequency(ListingFrequency frequency) { this.frequency = frequency; }
    public BigDecimal getPricePerUnit() { return pricePerUnit; }
    public void setPricePerUnit(BigDecimal pricePerUnit) { this.pricePerUnit = pricePerUnit; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
}
