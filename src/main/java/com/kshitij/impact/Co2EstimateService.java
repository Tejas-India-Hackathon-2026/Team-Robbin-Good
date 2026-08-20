package com.kshitij.impact;

import com.kshitij.collection.PickupWasteType;
import com.kshitij.marketplace.WasteType;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Hackathon-estimate CO2 savings calculator.
 *
 * Conversion table (approximate, not scientifically rigorous — plausible for demo):
 *
 * ┌─────────────────────┬─────────────────────────────────────────────────────────────────┐
 * │ Waste Type          │ CO2 Saved per unit                                               │
 * ├─────────────────────┼─────────────────────────────────────────────────────────────────┤
 * │ COOKING_OIL         │ 2.5 kg CO2 per litre (when converted to biodiesel)              │
 * │ FOOD_WASTE          │ 0.8 kg CO2 per kg (diverted from landfill, avoids methane)      │
 * │ FABRIC_SCRAP        │ 3.0 kg CO2 per kg (vs producing virgin polyester/cotton)        │
 * │ PAPER               │ 1.2 kg CO2 per kg (recycled vs virgin pulp)                     │
 * │ WOOD                │ 0.5 kg CO2 per kg (reused/recycled wood)                        │
 * │ PLASTIC             │ 1.8 kg CO2 per kg (recycled vs virgin plastic production)        │
 * │ METAL               │ 4.0 kg CO2 per kg (recycled vs virgin ore smelting)              │
 * │ OTHER               │ 0.5 kg CO2 per kg (conservative default)                         │
 * ├─────────────────────┼─────────────────────────────────────────────────────────────────┤
 * │ Household pickups:  │                                                                   │
 * │ PLASTIC             │ 1.8 kg CO2 per kg (same as B2B)                                  │
 * │ METAL               │ 4.0 kg CO2 per kg (same as B2B)                                  │
 * │ E_WASTE             │ 5.0 kg CO2 per kg (hazardous material diversion, high impact)    │
 * │ PAPER               │ 1.2 kg CO2 per kg (same as B2B)                                  │
 * │ OTHER               │ 0.5 kg CO2 per kg (conservative default)                         │
 * └─────────────────────┴─────────────────────────────────────────────────────────────────┘
 *
 * Sources (approximate):
 * - EPA WARM model for recycling offsets
 * - Biodiesel CO2 offset: ~2.5 kg CO2/litre (commonly cited lifecycle estimate)
 * - E-waste: conservatively high due to heavy metals and rare earth diversion
 */
@Service
public class Co2EstimateService {

    private static final Map<WasteType, Double> B2B_CO2_FACTORS = new HashMap<>();
    private static final Map<PickupWasteType, Double> HOUSEHOLD_CO2_FACTORS = new HashMap<>();

    static {
        B2B_CO2_FACTORS.put(WasteType.COOKING_OIL, 2.5);
        B2B_CO2_FACTORS.put(WasteType.FOOD_WASTE, 0.8);
        B2B_CO2_FACTORS.put(WasteType.FABRIC_SCRAP, 3.0);
        B2B_CO2_FACTORS.put(WasteType.PAPER, 1.2);
        B2B_CO2_FACTORS.put(WasteType.WOOD, 0.5);
        B2B_CO2_FACTORS.put(WasteType.PLASTIC, 1.8);
        B2B_CO2_FACTORS.put(WasteType.METAL, 4.0);
        B2B_CO2_FACTORS.put(WasteType.OTHER, 0.5);

        HOUSEHOLD_CO2_FACTORS.put(PickupWasteType.PLASTIC, 1.8);
        HOUSEHOLD_CO2_FACTORS.put(PickupWasteType.METAL, 4.0);
        HOUSEHOLD_CO2_FACTORS.put(PickupWasteType.E_WASTE, 5.0);
        HOUSEHOLD_CO2_FACTORS.put(PickupWasteType.PAPER, 1.2);
        HOUSEHOLD_CO2_FACTORS.put(PickupWasteType.OTHER, 0.5);
    }

    /**
     * Calculate CO2 saved for a B2B marketplace transaction.
     * @param wasteType the type of waste
     * @param quantity the agreed quantity (in the listing's unit — kg or litre)
     * @return estimated CO2 saved in kg
     */
    public double calculateB2bCo2Saved(WasteType wasteType, double quantity) {
        double factor = B2B_CO2_FACTORS.getOrDefault(wasteType, 0.5);
        return Math.round(quantity * factor * 100.0) / 100.0;
    }

    /**
     * Calculate CO2 saved for a household collection pickup.
     * @param wasteType the type of waste
     * @param quantity the estimated quantity collected (in kg)
     * @return estimated CO2 saved in kg
     */
    public double calculateHouseholdCo2Saved(PickupWasteType wasteType, double quantity) {
        double factor = HOUSEHOLD_CO2_FACTORS.getOrDefault(wasteType, 0.5);
        return Math.round(quantity * factor * 100.0) / 100.0;
    }

    /**
     * Get the CO2 factor for a B2B waste type (for display purposes).
     */
    public double getB2bFactor(WasteType wasteType) {
        return B2B_CO2_FACTORS.getOrDefault(wasteType, 0.5);
    }

    /**
     * Get the CO2 factor for a household waste type (for display purposes).
     */
    public double getHouseholdFactor(PickupWasteType wasteType) {
        return HOUSEHOLD_CO2_FACTORS.getOrDefault(wasteType, 0.5);
    }
}
