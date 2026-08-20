package com.kshitij.admin;

import com.kshitij.admin.dto.AdminDashboardResponse;
import com.kshitij.admin.dto.UserSummary;
import com.kshitij.collection.AggregationBatch;
import com.kshitij.collection.CollectionAgent;
import com.kshitij.collection.PickupRequest;
import com.kshitij.common.ApiResponse;
import com.kshitij.marketplace.Transaction;
import com.kshitij.marketplace.WasteListing;
import com.kshitij.user.Role;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * Admin REST API — system-wide oversight endpoints.
 * All return { success, data, message }.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    /*
     * GET /api/admin/stats
     * System-wide overview stats for the admin dashboard cards.
     */
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<AdminDashboardResponse>> getStats() {
        AdminDashboardResponse stats = adminService.getSystemStats();
        return ResponseEntity.ok(ApiResponse.ok(stats, "System stats"));
    }

    /*
     * GET /api/admin/users
     * GET /api/admin/users?role=BUSINESS_SELLER
     * All users, optionally filtered by role.
     */
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserSummary>>> getUsers(
            @RequestParam(required = false) Role role) {
        List<UserSummary> users = role != null ? adminService.getUsersByRole(role) : adminService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.ok(users, "Found " + users.size() + " users"));
    }

    /*
     * GET /api/admin/listings
     * All waste listings across the platform.
     */
    @GetMapping("/listings")
    public ResponseEntity<ApiResponse<List<WasteListing>>> getListings() {
        List<WasteListing> listings = adminService.getAllListings();
        return ResponseEntity.ok(ApiResponse.ok(listings, "Found " + listings.size() + " listings"));
    }

    /*
     * GET /api/admin/transactions
     * All transactions across the platform.
     */
    @GetMapping("/transactions")
    public ResponseEntity<ApiResponse<List<Transaction>>> getTransactions() {
        List<Transaction> txns = adminService.getAllTransactions();
        return ResponseEntity.ok(ApiResponse.ok(txns, "Found " + txns.size() + " transactions"));
    }

    /*
     * GET /api/admin/pickups
     * All pickup requests.
     */
    @GetMapping("/pickups")
    public ResponseEntity<ApiResponse<List<PickupRequest>>> getPickups() {
        List<PickupRequest> pickups = adminService.getAllPickups();
        return ResponseEntity.ok(ApiResponse.ok(pickups, "Found " + pickups.size() + " pickups"));
    }

    /*
     * GET /api/admin/agents
     * All collection agents.
     */
    @GetMapping("/agents")
    public ResponseEntity<ApiResponse<List<CollectionAgent>>> getAgents() {
        List<CollectionAgent> agents = adminService.getAllAgents();
        return ResponseEntity.ok(ApiResponse.ok(agents, "Found " + agents.size() + " agents"));
    }

    /*
     * GET /api/admin/batches
     * All aggregation batches.
     */
    @GetMapping("/batches")
    public ResponseEntity<ApiResponse<List<AggregationBatch>>> getBatches() {
        List<AggregationBatch> batches = adminService.getAllBatches();
        return ResponseEntity.ok(ApiResponse.ok(batches, "Found " + batches.size() + " batches"));
    }
}
