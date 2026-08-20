package com.kshitij.collection.dto;

import com.kshitij.collection.SubType;
import com.kshitij.collection.WasteCategory;
import jakarta.validation.constraints.NotNull;

public class CollectPickupRequest {
    @NotNull private Double actualQuantity;
    @NotNull private WasteCategory wasteCategory;
    @NotNull private SubType subType;

    public Double getActualQuantity() { return actualQuantity; }
    public void setActualQuantity(Double actualQuantity) { this.actualQuantity = actualQuantity; }
    public WasteCategory getWasteCategory() { return wasteCategory; }
    public void setWasteCategory(WasteCategory wasteCategory) { this.wasteCategory = wasteCategory; }
    public SubType getSubType() { return subType; }
    public void setSubType(SubType subType) { this.subType = subType; }
}
