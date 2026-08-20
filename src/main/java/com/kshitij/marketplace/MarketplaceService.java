package com.kshitij.marketplace;

import com.kshitij.common.exception.BadRequestException;
import com.kshitij.common.exception.ResourceNotFoundException;
import com.kshitij.impact.Co2EstimateService;
import com.kshitij.marketplace.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MarketplaceService {
    private static final BigDecimal COMMISSION_RATE = new BigDecimal("0.05");

    private final WasteListingRepository listingRepo;
    private final BuyerRequirementRepository requirementRepo;
    private final TransactionRepository transactionRepo;
    private final Co2EstimateService co2EstimateService;

    public MarketplaceService(WasteListingRepository listingRepo,
                              BuyerRequirementRepository requirementRepo,
                              TransactionRepository transactionRepo,
                              Co2EstimateService co2EstimateService) {
        this.listingRepo = listingRepo;
        this.requirementRepo = requirementRepo;
        this.transactionRepo = transactionRepo;
        this.co2EstimateService = co2EstimateService;
    }

    /*
     * POST /api/listings
     * Creates a new waste listing from a seller.
     * The sellerId must be passed (extracted from JWT in controller).
     */
    public WasteListing createListing(Long sellerId, CreateListingRequest req) {
        WasteListing listing = new WasteListing();
        listing.setSellerId(sellerId);
        listing.setWasteType(req.getWasteType());
        listing.setQuantity(req.getQuantity());
        listing.setUnit(req.getUnit());
        listing.setFrequency(req.getFrequency());
        listing.setPricePerUnit(req.getPricePerUnit());
        listing.setLocation(req.getLocation());
        listing.setCity(req.getCity());
        listing.setStatus(ListingStatus.ACTIVE);
        return listingRepo.save(listing);
    }

    /*
     * GET /api/listings/search?wasteType=X&city=Y
     * Buyers search for active listings by waste type and/or city.
     * Both params optional — if omitted, filter is skipped for that field.
     */
    public List<WasteListing> searchListings(WasteType wasteType, String city) {
        if (wasteType != null && city != null && !city.isBlank()) {
            return listingRepo.findByWasteTypeAndCityAndStatus(wasteType, city, ListingStatus.ACTIVE);
        }
        if (wasteType != null) {
            return listingRepo.findByStatus(ListingStatus.ACTIVE).stream()
                    .filter(l -> l.getWasteType() == wasteType)
                    .toList();
        }
        if (city != null && !city.isBlank()) {
            return listingRepo.findByCityAndStatus(city, ListingStatus.ACTIVE);
        }
        return listingRepo.findByStatus(ListingStatus.ACTIVE);
    }

    /*
     * GET /api/listings/{id}
     */
    public WasteListing getListingById(Long id) {
        return listingRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + id));
    }

    /*
     * POST /api/transactions/request
     * Buyer sends a purchase request on a listing.
     */
    @Transactional
    public Transaction requestTransaction(Long buyerId, TransactionRequest req) {
        WasteListing listing = getListingById(req.getListingId());

        if (listing.getStatus() != ListingStatus.ACTIVE) {
            throw new BadRequestException("Listing is not active");
        }
        if (listing.getSellerId().equals(buyerId)) {
            throw new BadRequestException("Cannot request your own listing");
        }
        if (req.getAgreedQuantity() > listing.getQuantity()) {
            throw new BadRequestException("Agreed quantity exceeds available quantity");
        }

        Transaction txn = new Transaction();
        txn.setListingId(listing.getId());
        txn.setBuyerId(buyerId);
        txn.setSellerId(listing.getSellerId());
        txn.setAgreedQuantity(req.getAgreedQuantity());
        txn.setAgreedPrice(req.getAgreedPrice());
        BigDecimal totalValue = req.getAgreedPrice().multiply(BigDecimal.valueOf(req.getAgreedQuantity()));
        txn.setCommissionAmount(totalValue.multiply(COMMISSION_RATE).setScale(2, RoundingMode.HALF_UP));
        txn.setStatus(TransactionStatus.REQUESTED);
        txn.setCo2SavedKg(0.0);
        return transactionRepo.save(txn);
    }

    /*
     * PUT /api/transactions/{id}/accept
     * Seller accepts the transaction request.
     * Auto-rejects other pending requests for the same listing.
     * Reduces listing quantity; marks listing COMPLETED if fully used.
     */
    @Transactional
    public Transaction acceptTransaction(Long txnId, Long sellerId) {
        Transaction txn = getTransactionOrThrow(txnId);
        if (!txn.getSellerId().equals(sellerId)) {
            throw new BadRequestException("Only the seller can accept this transaction");
        }
        if (txn.getStatus() != TransactionStatus.REQUESTED) {
            throw new BadRequestException("Transaction is not in REQUESTED status");
        }

        WasteListing listing = getListingById(txn.getListingId());
        if (listing.getQuantity() < txn.getAgreedQuantity()) {
            throw new BadRequestException("Insufficient listing quantity. Available: " + listing.getQuantity());
        }

        txn.setStatus(TransactionStatus.ACCEPTED);
        transactionRepo.save(txn);

        listing.setQuantity(listing.getQuantity() - txn.getAgreedQuantity());
        if (listing.getQuantity() <= 0) {
            listing.setStatus(ListingStatus.COMPLETED);
        }
        listingRepo.save(listing);

        List<Transaction> others = transactionRepo.findByListingIdAndStatusIn(
            txn.getListingId(), List.of(TransactionStatus.REQUESTED));
        for (Transaction other : others) {
            if (!other.getId().equals(txnId)) {
                other.setStatus(TransactionStatus.REJECTED);
                transactionRepo.save(other);
            }
        }

        return txn;
    }

    /*
     * PUT /api/transactions/{id}/reject
     * Seller rejects the transaction request.
     */
    public Transaction rejectTransaction(Long txnId, Long sellerId) {
        Transaction txn = getTransactionOrThrow(txnId);
        if (!txn.getSellerId().equals(sellerId)) {
            throw new BadRequestException("Only the seller can reject this transaction");
        }
        if (txn.getStatus() != TransactionStatus.REQUESTED) {
            throw new BadRequestException("Transaction is not in REQUESTED status");
        }
        txn.setStatus(TransactionStatus.REJECTED);
        return transactionRepo.save(txn);
    }

    /*
     * PUT /api/transactions/{id}/complete
     * Marks transaction as completed. Auto-calculates commission and CO2 saved.
     */
    @Transactional
    public Transaction completeTransaction(Long txnId) {
        Transaction txn = getTransactionOrThrow(txnId);
        if (txn.getStatus() != TransactionStatus.ACCEPTED && txn.getStatus() != TransactionStatus.PICKED_UP) {
            throw new BadRequestException("Transaction must be ACCEPTED or PICKED_UP to complete");
        }

        WasteListing listing = getListingById(txn.getListingId());
        txn.setStatus(TransactionStatus.COMPLETED);
        txn.setCompletedAt(LocalDateTime.now());

        // Recalculate commission at completion (5% of total transaction value)
        BigDecimal totalValue = txn.getAgreedPrice().multiply(BigDecimal.valueOf(txn.getAgreedQuantity()));
        txn.setCommissionAmount(totalValue.multiply(COMMISSION_RATE).setScale(2, RoundingMode.HALF_UP));

        // Calculate CO2 saved
        double co2 = co2EstimateService.calculateB2bCo2Saved(listing.getWasteType(), txn.getAgreedQuantity());
        txn.setCo2SavedKg(co2);

        // Mark listing as completed if fully used
        if (txn.getAgreedQuantity() >= listing.getQuantity()) {
            listing.setStatus(ListingStatus.COMPLETED);
            listingRepo.save(listing);
        } else {
            listing.setQuantity(listing.getQuantity() - txn.getAgreedQuantity());
            listingRepo.save(listing);
        }

        return transactionRepo.save(txn);
    }

    /*
     * GET /api/transactions/{id}
     */
    public Transaction getTransaction(Long txnId) {
        return getTransactionOrThrow(txnId);
    }

    /*
     * GET /api/transactions/seller/{sellerId}
     */
    public List<Transaction> getTransactionsBySeller(Long sellerId) {
        return transactionRepo.findBySellerIdOrderByCreatedAtDesc(sellerId);
    }

    /*
     * GET /api/transactions/buyer/{buyerId}
     */
    public List<Transaction> getTransactionsByBuyer(Long buyerId) {
        return transactionRepo.findByBuyerIdOrderByCreatedAtDesc(buyerId);
    }

    /*
     * GET /api/dashboard/seller/{id}
     * Returns aggregate stats for a seller.
     */
    public SellerDashboardResponse getSellerDashboard(Long sellerId) {
        Double totalSold = transactionRepo.sumQuantitySoldBySeller(sellerId);
        BigDecimal totalEarned = transactionRepo.sumEarnedBySeller(sellerId);
        BigDecimal totalCommission = transactionRepo.sumCommissionBySeller(sellerId);
        Double totalCo2 = transactionRepo.sumCo2SavedBySeller(sellerId);
        return new SellerDashboardResponse(totalSold, totalEarned, totalCommission, totalCo2);
    }

    /*
     * GET /api/dashboard/buyer/{id}
     * Returns aggregate stats for a buyer, including estimated savings vs market rate.
     * Market rate estimated as 1.25x the price the buyer actually paid (25% markup estimate).
     */
    public BuyerDashboardResponse getBuyerDashboard(Long buyerId) {
        Double totalBought = transactionRepo.sumQuantityBoughtByBuyer(buyerId);
        BigDecimal totalSpent = transactionRepo.sumSpentByBuyer(buyerId);
        BigDecimal marketRateTotal = totalSpent.multiply(new BigDecimal("1.25")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal savings = marketRateTotal.subtract(totalSpent);
        Double totalCo2 = transactionRepo.sumCo2SavedByBuyer(buyerId);
        return new BuyerDashboardResponse(totalBought, totalSpent, marketRateTotal, savings, totalCo2);
    }

    private Transaction getTransactionOrThrow(Long id) {
        return transactionRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + id));
    }
}
