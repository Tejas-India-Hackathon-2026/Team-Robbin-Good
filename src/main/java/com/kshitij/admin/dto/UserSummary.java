package com.kshitij.admin.dto;

import com.kshitij.user.Role;

import java.time.LocalDateTime;

/*
 * User summary for admin user management table.
 * Excludes password for security.
 */
public class UserSummary {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private String phone;
    private String city;
    private String address;
    private LocalDateTime createdAt;

    public UserSummary(Long id, String name, String email, Role role, String phone,
                       String city, String address, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.phone = phone;
        this.city = city;
        this.address = address;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
    public String getPhone() { return phone; }
    public String getCity() { return city; }
    public String getAddress() { return address; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
