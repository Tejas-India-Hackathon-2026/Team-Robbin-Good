package com.kshitij.collection;

import com.kshitij.collection.dto.*;
import com.kshitij.common.ApiResponse;
import com.kshitij.common.SecurityUtils;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * Collection & Rewards REST API — all endpoints return { success, data, message }.
 */
@RestController
@RequestMapping("/api")
public class CollectionController {
    private final CollectionService collectionService;

    public CollectionController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }

    /*
     * POST /api/pickup-requests
     * Request:  { wasteType, estimatedQuantity, unit, address, city }
     * Response: { success: true, data: { ...pickupRequest }, message: "Pickup request created" }
     */
    @PostMapping("/pickup-requests")
    public ResponseEntity<ApiResponse<PickupRequest>> createPickupRequest(
            @Valid @RequestBody CreatePickupRequest request) {
        Long userId = SecurityUtils.getCurrentUserId();
        PickupRequest pr = collectionService.createPickupRequest(userId, request);
        return ResponseEntity.ok(ApiResponse.ok(pr, "Pickup request created"));
    }

    /*
     * PUT /api/pickup-requests/{id}/assign
     * Response: { success: true, data: { ...pickupRequest }, message: "Agent assigned" }
     */
    @PutMapping("/pickup-requests/{id}/assign")
    public ResponseEntity<ApiResponse<PickupRequest>> assignAgent(@PathVariable Long id) {
        PickupRequest pr = collectionService.assignAgent(id);
        return ResponseEntity.ok(ApiResponse.ok(pr, "Agent assigned"));
    }

    /*
     * PUT /api/pickup-requests/{id}/collect
     * Response: { success: true, data: { ...pickupRequest, co2SavedKg }, message: "Pickup collected, rewards credited" }
     */
    @PutMapping("/pickup-requests/{id}/collect")
    public ResponseEntity<ApiResponse<PickupRequest>> collectPickup(@PathVariable Long id) {
        PickupRequest pr = collectionService.collectPickup(id);
        return ResponseEntity.ok(ApiResponse.ok(pr, "Pickup collected, rewards credited"));
    }

    /*
     * GET /api/pickup-requests?city=X&status=REQUESTED
     * Both params optional.
     * Response: { success: true, data: [ ...pickupRequests ], message: "Found N pickup requests" }
     */
    @GetMapping("/pickup-requests")
    public ResponseEntity<ApiResponse<List<PickupRequest>>> listPickupRequests(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) PickupStatus status) {
        List<PickupRequest> results = collectionService.listPickupRequests(city, status);
        return ResponseEntity.ok(ApiResponse.ok(results, "Found " + results.size() + " pickup requests"));
    }

    /*
     * GET /api/pickup-requests/{id}
     * Response: { success: true, data: { ...pickupRequest }, message: "Pickup request found" }
     */
    @GetMapping("/pickup-requests/{id}")
    public ResponseEntity<ApiResponse<PickupRequest>> getPickupRequest(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(collectionService.getPickupRequest(id), "Pickup request found"));
    }

    /*
     * GET /api/pickup-requests/user/{userId}
     * Response: { success: true, data: [ ...pickupRequests ], message: "..." }
     */
    @GetMapping("/pickup-requests/user/{userId}")
    public ResponseEntity<ApiResponse<List<PickupRequest>>> getUserPickups(@PathVariable Long userId) {
        List<PickupRequest> results = collectionService.getUserPickups(userId);
        return ResponseEntity.ok(ApiResponse.ok(results, "Found " + results.size() + " pickups for user"));
    }

    /*
     * POST /api/agents
     * Request:  { userId, city }  — admin registers a collection agent
     * Response: { success: true, data: { ...collectionAgent }, message: "Agent registered" }
     */
    @PostMapping("/agents")
    public ResponseEntity<ApiResponse<CollectionAgent>> registerAgent(
            @RequestParam Long userId,
            @RequestParam String city) {
        CollectionAgent agent = collectionService.registerAgent(userId, city);
        return ResponseEntity.ok(ApiResponse.ok(agent, "Agent registered"));
    }

    /*
     * GET /api/agents?city=Bangalore
     * Response: { success: true, data: [ ...agents ], message: "..." }
     */
    @GetMapping("/agents")
    public ResponseEntity<ApiResponse<List<CollectionAgent>>> listAgents(
            @RequestParam(required = false) String city) {
        List<CollectionAgent> results = collectionService.listAgents(city);
        return ResponseEntity.ok(ApiResponse.ok(results, "Found " + results.size() + " agents"));
    }

    /*
     * GET /api/aggregation-batches?city=X&status=COLLECTING
     * Response: { success: true, data: [ ...batches ], message: "..." }
     */
    @GetMapping("/aggregation-batches")
    public ResponseEntity<ApiResponse<List<AggregationBatch>>> listBatches(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) BatchStatus status) {
        List<AggregationBatch> results = collectionService.listBatches(city, status);
        return ResponseEntity.ok(ApiResponse.ok(results, "Found " + results.size() + " batches"));
    }

    /*
     * PUT /api/aggregation-batches/{id}/sell
     * Request:  { soldToBuyerId, saleAmount }
     * Response: { success: true, data: { ...batch }, message: "Batch marked as sold" }
     */
    @PutMapping("/aggregation-batches/{id}/sell")
    public ResponseEntity<ApiResponse<AggregationBatch>> sellBatch(
            @PathVariable Long id,
            @Valid @RequestBody SellBatchRequest request) {
        AggregationBatch batch = collectionService.sellBatch(id, request);
        return ResponseEntity.ok(ApiResponse.ok(batch, "Batch marked as sold"));
    }

    /*
     * GET /api/rewards/{householdUserId}
     * Response: { success: true, data: { userId, totalPoints, redeemedPoints, availablePoints, history }, message: "..." }
     */
    @GetMapping("/rewards/{householdUserId}")
    public ResponseEntity<ApiResponse<RewardResponse>> getRewards(@PathVariable Long householdUserId) {
        RewardResponse rewards = collectionService.getRewards(householdUserId);
        return ResponseEntity.ok(ApiResponse.ok(rewards, "Rewards retrieved"));
    }

    /*
     * GET /api/dashboard/household/{userId}
     * Response: { success: true, data: { userId, totalPickupsCollected, totalWasteHandedOverKg,
     *   totalCo2SavedKg, totalPointsEarned, availablePoints, recentPickups }, message: "..." }
     */
    @GetMapping("/dashboard/household/{userId}")
    public ResponseEntity<ApiResponse<HouseholdDashboardResponse>> householdDashboard(@PathVariable Long userId) {
        HouseholdDashboardResponse dash = collectionService.getHouseholdDashboard(userId);
        return ResponseEntity.ok(ApiResponse.ok(dash, "Household dashboard"));
    }
}
