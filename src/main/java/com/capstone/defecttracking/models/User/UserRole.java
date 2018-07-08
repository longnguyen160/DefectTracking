package com.capstone.defecttracking.models.User;

public class UserRole {
    private String role;
    private String userId;

    public UserRole() {
    }

    public UserRole(String role, String userId) {
        this.role = role;
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
