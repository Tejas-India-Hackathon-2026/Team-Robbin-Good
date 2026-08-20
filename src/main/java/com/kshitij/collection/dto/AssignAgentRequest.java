package com.kshitij.collection.dto;

import jakarta.validation.constraints.NotNull;

public class AssignAgentRequest {
    @NotNull private Long agentId;

    public Long getAgentId() { return agentId; }
    public void setAgentId(Long agentId) { this.agentId = agentId; }
}
