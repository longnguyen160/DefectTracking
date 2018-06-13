package com.capstone.defecttracking.models.User;

public class UserRole {
    private String userId;
    private String role;

    public UserRole() {
    }

    public UserRole(String userId, String role) {
        this.userId = userId;
        this.role = role;
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
