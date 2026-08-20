package com.kshitij.auth;

import com.kshitij.auth.dto.AuthResponse;
import com.kshitij.auth.dto.LoginRequest;
import com.kshitij.auth.dto.RegisterRequest;
import com.kshitij.common.ApiResponse;
import com.kshitij.common.SecurityUtils;
import com.kshitij.user.User;
import com.kshitij.user.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(authService.register(request), "Registration successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(authService.login(request), "Login successful"));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<User>> getMe() {
        Long userId = SecurityUtils.getCurrentUserId();
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(ApiResponse.ok(user, "Profile"));
    }
}
