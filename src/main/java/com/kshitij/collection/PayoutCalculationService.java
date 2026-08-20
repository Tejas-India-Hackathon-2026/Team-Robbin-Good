package com.kshitij.collection;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class PayoutCalculationService {

    private static final Map<SubType, BigDecimal> RATE_CARD = Map.of(
        SubType.PLASTIC,    new BigDecimal("12.00"),
        SubType.METAL,      new BigDecimal("25.00"),
        SubType.PAPER,      new BigDecimal("6.00"),
        SubType.E_WASTE,    new BigDecimal("15.00"),
        SubType.FOOD_WASTE, new BigDecimal("2.00"),
        SubType.GARDEN_WASTE, new BigDecimal("1.00"),
        SubType.OTHER,      new BigDecimal("0.50")
    );

    public BigDecimal getPayout(SubType subType, Double quantityKg) {
        BigDecimal rate = RATE_CARD.getOrDefault(subType, new BigDecimal("0.50"));
        return rate.multiply(BigDecimal.valueOf(quantityKg));
    }

    public BigDecimal getRate(SubType subType) {
        return RATE_CARD.getOrDefault(subType, new BigDecimal("0.50"));
    }

    public Map<SubType, BigDecimal> getAllRates() {
        return RATE_CARD;
    }
}
