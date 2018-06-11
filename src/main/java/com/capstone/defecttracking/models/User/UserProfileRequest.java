package com.capstone.defecttracking.models.User;

public class UserProfileRequest {
    private UserProfile profile;
    private String email;

    public UserProfileRequest() {
    }

    public UserProfileRequest(UserProfile profile, String email) {
        this.profile = profile;
        this.email = email;
    }

    public UserProfile getProfile() {
        return profile;
    }

    public void setProfile(UserProfile profile) {
        this.profile = profile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
