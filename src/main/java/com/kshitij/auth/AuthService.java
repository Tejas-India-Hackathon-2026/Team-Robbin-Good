package com.kshitij.auth;

import com.kshitij.auth.dto.AuthResponse;
import com.kshitij.auth.dto.LoginRequest;
import com.kshitij.auth.dto.RegisterRequest;
import com.kshitij.common.exception.BadRequestException;
import com.kshitij.common.exception.ResourceNotFoundException;
import com.kshitij.security.JwtService;
import com.kshitij.user.User;
import com.kshitij.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setPhone(request.getPhone());
        user.setCity(request.getCity());
        user.setAddress(request.getAddress());
        User saved = userRepository.save(user);
        return new AuthResponse(jwtService.generateToken(saved), saved.getId(), saved.getName(), saved.getEmail(), saved.getRole());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid credentials");
        }
        return new AuthResponse(jwtService.generateToken(user), user.getId(), user.getName(), user.getEmail(), user.getRole());
    }
}
