package com.kshitij.marketplace.dto;

import com.kshitij.marketplace.ListingUnit;
import com.kshitij.marketplace.WasteType;
import jakarta.validation.constraints.NotNull;

/*
 * Request body for POST /api/requirements
 * {
 *   "wasteType": "COOKING_OIL",
 *   "requiredQuantity": 200,
 *   "unit": "LITRE",
 *   "maxDistanceKm": 50,
 *   "city": "Bangalore"
 * }
 */
public class CreateRequirementRequest {
    @NotNull private WasteType wasteType;
    @NotNull private Double requiredQuantity;
    @NotNull private ListingUnit unit;
    private Double maxDistanceKm;
    @NotNull private String city;

    public WasteType getWasteType() { return wasteType; }
    public void setWasteType(WasteType wasteType) { this.wasteType = wasteType; }
    public Double getRequiredQuantity() { return requiredQuantity; }
    public void setRequiredQuantity(Double requiredQuantity) { this.requiredQuantity = requiredQuantity; }
    public ListingUnit getUnit() { return unit; }
    public void setUnit(ListingUnit unit) { this.unit = unit; }
    public Double getMaxDistanceKm() { return maxDistanceKm; }
    public void setMaxDistanceKm(Double maxDistanceKm) { this.maxDistanceKm = maxDistanceKm; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
}
