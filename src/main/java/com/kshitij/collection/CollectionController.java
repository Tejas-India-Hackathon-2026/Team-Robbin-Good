package com.kshitij.collection;

import com.kshitij.collection.dto.*;
import com.kshitij.common.ApiResponse;
import com.kshitij.impact.Co2EstimateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CollectionController {
    private final CollectionService collectionService;
    private final PayoutCalculationService payoutService;

    public CollectionController(CollectionService collectionService,
                                PayoutCalculationService payoutService) {
        this.collectionService = collectionService;
        this.payoutService = payoutService;
    }

    @PostMapping("/pickup-requests")
    public ResponseEntity<ApiResponse<PickupRequest>> createPickup(
            @RequestBody CreatePickupRequest req) {
        PickupRequest pr = collectionService.createPickupRequest(req);
        return ResponseEntity.ok(ApiResponse.ok(pr, "Pickup request created"));
    }

    @GetMapping("/pickup-requests/{id}")
    public ResponseEntity<ApiResponse<PickupRequest>> getPickup(@PathVariable Long id) {
        PickupRequest pr = collectionService.getPickupRequest(id);
        return ResponseEntity.ok(ApiResponse.ok(pr, "Pickup request"));
    }

    @GetMapping("/pickup-requests/household/{userId}")
    public ResponseEntity<ApiResponse<List<PickupRequest>>> getMyPickups(@PathVariable Long userId) {
        List<PickupRequest> pickups = collectionService.getPickupsByHousehold(userId);
        return ResponseEntity.ok(ApiResponse.ok(pickups, "Found " + pickups.size() + " pickups"));
    }

    @GetMapping("/pickup-requests/assigned/{agentId}")
    public ResponseEntity<ApiResponse<List<PickupRequest>>> getAgentAssignedPickups(
            @PathVariable Long agentId) {
        List<PickupRequest> pickups = collectionService.getPickupsAssignedToAgent(agentId);
        return ResponseEntity.ok(ApiResponse.ok(pickups, "Found " + pickups.size() + " assigned pickups"));
    }

    @PutMapping("/pickup-requests/{id}/assign")
    public ResponseEntity<ApiResponse<PickupRequest>> assignAgent(
            @PathVariable Long id,
            @RequestBody AssignAgentRequest req) {
        PickupRequest pr = collectionService.assignAgent(id, req.getAgentId());
        return ResponseEntity.ok(ApiResponse.ok(pr, "Agent assigned"));
    }

    @PutMapping("/pickup-requests/{id}/collect")
    public ResponseEntity<ApiResponse<PickupRequest>> collectPickup(
            @PathVariable Long id,
            @RequestBody CollectPickupRequest req) {
        PickupRequest pr = collectionService.collectPickup(id, req);
        return ResponseEntity.ok(ApiResponse.ok(pr, "Pickup collected and wallet credited"));
    }

    @PutMapping("/pickup-requests/{id}/cancel")
    public ResponseEntity<ApiResponse<PickupRequest>> cancelPickup(@PathVariable Long id) {
        PickupRequest pr = collectionService.cancelPickup(id);
        return ResponseEntity.ok(ApiResponse.ok(pr, "Pickup cancelled"));
    }

    @GetMapping("/wallet/{userId}")
    public ResponseEntity<ApiResponse<WalletBalance>> getWallet(@PathVariable Long userId) {
        WalletBalance wallet = collectionService.getWallet(userId);
        return ResponseEntity.ok(ApiResponse.ok(wallet, "Wallet balance"));
    }

    @GetMapping("/wallet/{userId}/transactions")
    public ResponseEntity<ApiResponse<List<WalletTransaction>>> getWalletTransactions(
            @PathVariable Long userId) {
        List<WalletTransaction> txns = collectionService.getWalletTransactions(userId);
        return ResponseEntity.ok(ApiResponse.ok(txns, "Found " + txns.size() + " transactions"));
    }

    @GetMapping("/compost-batches")
    public ResponseEntity<ApiResponse<List<CompostBatch>>> getCompostBatches() {
        List<CompostBatch> batches = collectionService.getAllCompostBatches();
        return ResponseEntity.ok(ApiResponse.ok(batches, "Found " + batches.size() + " compost batches"));
    }

    @GetMapping("/compost-batches/{city}")
    public ResponseEntity<ApiResponse<List<CompostBatch>>> getCompostBatchesByCity(
            @PathVariable String city) {
        List<CompostBatch> batches = collectionService.getCompostBatchesByCity(city);
        return ResponseEntity.ok(ApiResponse.ok(batches, "Found " + batches.size() + " compost batches"));
    }

    @PostMapping("/compost-batches/{id}/distribute")
    public ResponseEntity<ApiResponse<FarmerDistribution>> distributeCompost(
            @PathVariable Long id,
            @RequestBody FarmerDistributionRequest req) {
        FarmerDistribution dist = collectionService.distributeCompost(id, req);
        return ResponseEntity.ok(ApiResponse.ok(dist, "Compost distributed to farmer"));
    }

    @GetMapping("/compost-batches/{id}/distributions")
    public ResponseEntity<ApiResponse<List<FarmerDistribution>>> getDistributions(
            @PathVariable Long id) {
        List<FarmerDistribution> dists = collectionService.getDistributions(id);
        return ResponseEntity.ok(ApiResponse.ok(dists, "Found " + dists.size() + " distributions"));
    }

    @GetMapping("/rate-card")
    public ResponseEntity<ApiResponse<java.util.Map<SubType, BigDecimal>>> getRateCard() {
        return ResponseEntity.ok(ApiResponse.ok(payoutService.getAllRates(), "Rate card"));
    }
}
