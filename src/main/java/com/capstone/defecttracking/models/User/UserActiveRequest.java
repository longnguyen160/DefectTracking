package com.capstone.defecttracking.models.User;

public class UserActiveRequest {
    private String id;
    private boolean active;

    public UserActiveRequest() {
    }

    public UserActiveRequest(String id, boolean active) {
        this.id = id;
        this.active = active;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
