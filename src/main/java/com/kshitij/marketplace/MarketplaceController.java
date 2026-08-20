package com.kshitij.marketplace;

import com.kshitij.common.ApiResponse;
import com.kshitij.common.SecurityUtils;
import com.kshitij.marketplace.dto.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * Marketplace REST API — all endpoints return { success, data, message }.
 */
@RestController
@RequestMapping("/api")
public class MarketplaceController {
    private final MarketplaceService marketplaceService;

    public MarketplaceController(MarketplaceService marketplaceService) {
        this.marketplaceService = marketplaceService;
    }

    /*
     * POST /api/listings
     * Request:  { wasteType, quantity, unit, frequency, pricePerUnit?, location?, city }
     * Response: { success: true, data: { id, sellerId, wasteType, ... }, message: "Listing created" }
     */
    @PostMapping("/listings")
    public ResponseEntity<ApiResponse<WasteListing>> createListing(
            @Valid @RequestBody CreateListingRequest request) {
        Long sellerId = SecurityUtils.getCurrentUserId();
        WasteListing listing = marketplaceService.createListing(sellerId, request);
        return ResponseEntity.ok(ApiResponse.ok(listing, "Listing created"));
    }

    /*
     * GET /api/listings/search?wasteType=COOKING_OIL&city=Bangalore
     * Both params optional.
     * Response: { success: true, data: [ ...listings ], message: "Found N listings" }
     */
    @GetMapping("/listings/search")
    public ResponseEntity<ApiResponse<List<WasteListing>>> searchListings(
            @RequestParam(required = false) WasteType wasteType,
            @RequestParam(required = false) String city) {
        List<WasteListing> results = marketplaceService.searchListings(wasteType, city);
        return ResponseEntity.ok(ApiResponse.ok(results, "Found " + results.size() + " listings"));
    }

    /*
     * GET /api/listings/{id}
     * Response: { success: true, data: { ...listing }, message: "Listing found" }
     */
    @GetMapping("/listings/{id}")
    public ResponseEntity<ApiResponse<WasteListing>> getListing(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(marketplaceService.getListingById(id), "Listing found"));
    }

    /*
     * GET /api/transactions/seller/{sellerId}
     * Response: { success: true, data: [ ...transactions ], message: "Found N transactions" }
     */
    @GetMapping("/transactions/seller/{sellerId}")
    public ResponseEntity<ApiResponse<List<Transaction>>> getTransactionsBySeller(@PathVariable Long sellerId) {
        List<Transaction> txns = marketplaceService.getTransactionsBySeller(sellerId);
        return ResponseEntity.ok(ApiResponse.ok(txns, "Found " + txns.size() + " transactions"));
    }

    /*
     * GET /api/transactions/buyer/{buyerId}
     * Response: { success: true, data: [ ...transactions ], message: "Found N transactions" }
     */
    @GetMapping("/transactions/buyer/{buyerId}")
    public ResponseEntity<ApiResponse<List<Transaction>>> getTransactionsByBuyer(@PathVariable Long buyerId) {
        List<Transaction> txns = marketplaceService.getTransactionsByBuyer(buyerId);
        return ResponseEntity.ok(ApiResponse.ok(txns, "Found " + txns.size() + " transactions"));
    }

    /*
     * POST /api/transactions/request
     * Request:  { listingId, agreedQuantity, agreedPrice }
     * Response: { success: true, data: { ...transaction }, message: "Transaction request sent" }
     */
    @PostMapping("/transactions/request")
    public ResponseEntity<ApiResponse<Transaction>> requestTransaction(
            @Valid @RequestBody TransactionRequest request) {
        Long buyerId = SecurityUtils.getCurrentUserId();
        Transaction txn = marketplaceService.requestTransaction(buyerId, request);
        return ResponseEntity.ok(ApiResponse.ok(txn, "Transaction request sent"));
    }

    /*
     * PUT /api/transactions/{id}/accept
     * Response: { success: true, data: { ...transaction }, message: "Transaction accepted" }
     */
    @PutMapping("/transactions/{id}/accept")
    public ResponseEntity<ApiResponse<Transaction>> acceptTransaction(@PathVariable Long id) {
        Long sellerId = SecurityUtils.getCurrentUserId();
        Transaction txn = marketplaceService.acceptTransaction(id, sellerId);
        return ResponseEntity.ok(ApiResponse.ok(txn, "Transaction accepted"));
    }

    /*
     * PUT /api/transactions/{id}/reject
     * Response: { success: true, data: { ...transaction }, message: "Transaction rejected" }
     */
    @PutMapping("/transactions/{id}/reject")
    public ResponseEntity<ApiResponse<Transaction>> rejectTransaction(@PathVariable Long id) {
        Long sellerId = SecurityUtils.getCurrentUserId();
        Transaction txn = marketplaceService.rejectTransaction(id, sellerId);
        return ResponseEntity.ok(ApiResponse.ok(txn, "Transaction rejected"));
    }

    /*
     * PUT /api/transactions/{id}/complete
     * Response: { success: true, data: { ...transaction, co2SavedKg }, message: "Transaction completed" }
     */
    @PutMapping("/transactions/{id}/complete")
    public ResponseEntity<ApiResponse<Transaction>> completeTransaction(@PathVariable Long id) {
        Transaction txn = marketplaceService.completeTransaction(id);
        return ResponseEntity.ok(ApiResponse.ok(txn, "Transaction completed"));
    }

    /*
     * GET /api/transactions/{id}
     * Response: { success: true, data: { ...transaction }, message: "Transaction found" }
     */
    @GetMapping("/transactions/{id}")
    public ResponseEntity<ApiResponse<Transaction>> getTransaction(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(marketplaceService.getTransaction(id), "Transaction found"));
    }

    /*
     * GET /api/dashboard/seller/{id}
     * Response: { success: true, data: { totalWasteSoldKg, totalEarned, totalCommissionPaid, totalCo2SavedKg }, message: "Seller dashboard" }
     */
    @GetMapping("/dashboard/seller/{id}")
    public ResponseEntity<ApiResponse<SellerDashboardResponse>> sellerDashboard(@PathVariable Long id) {
        SellerDashboardResponse dash = marketplaceService.getSellerDashboard(id);
        return ResponseEntity.ok(ApiResponse.ok(dash, "Seller dashboard"));
    }

    /*
     * GET /api/dashboard/buyer/{id}
     * Response: { success: true, data: { totalWasteBoughtKg, totalSpent, estimatedMarketRateTotal, estimatedSavings, totalCo2SavedKg }, message: "Buyer dashboard" }
     */
    @GetMapping("/dashboard/buyer/{id}")
    public ResponseEntity<ApiResponse<BuyerDashboardResponse>> buyerDashboard(@PathVariable Long id) {
        BuyerDashboardResponse dash = marketplaceService.getBuyerDashboard(id);
        return ResponseEntity.ok(ApiResponse.ok(dash, "Buyer dashboard"));
    }
}
