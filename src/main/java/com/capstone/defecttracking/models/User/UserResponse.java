package com.capstone.defecttracking.models.User;

public class UserResponse {
    private String id;
    private String username;
    private String avatarURL;
    private String email;

    public UserResponse(String id, String username, String avatarURL, String email) {
        this.id = id;
        this.username = username;
        this.avatarURL = avatarURL;
        this.email = email;
    }

    public UserResponse(String id, String username, String avatarURL) {
        this.id = id;
        this.username = username;
        this.avatarURL = avatarURL;
    }

    public UserResponse(String id, String username) {
        this.id = id;
        this.username = username;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAvatarURL() {
        return avatarURL;
    }

    public void setAvatarURL(String avatarURL) {
        this.avatarURL = avatarURL;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
