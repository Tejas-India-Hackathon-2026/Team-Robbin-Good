package com.kshitij.collection;

import jakarta.persistence.*;

/*
 * CollectionAgent — a gig worker who picks up household waste.
 * Linked to a User entity with role COLLECTION_AGENT.
 */
@Entity
@Table(name = "collection_agents")
public class CollectionAgent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String assignedCity;

    @Column(nullable = false)
    private Boolean isActive = true;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getAssignedCity() { return assignedCity; }
    public void setAssignedCity(String assignedCity) { this.assignedCity = assignedCity; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean active) { isActive = active; }
}
