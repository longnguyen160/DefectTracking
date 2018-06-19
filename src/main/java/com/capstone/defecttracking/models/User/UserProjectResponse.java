package com.capstone.defecttracking.models.User;

public class UserProjectResponse {
    private String id;
    private String username;
    private String email;
    private String role;
    private String avatarURL;

    public UserProjectResponse() {
    }

    public UserProjectResponse(String id, String username, String email, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }

    public UserProjectResponse(String id, String username, String email, String role, String avatarURL) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.avatarURL = avatarURL;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getAvatarURL() {
        return avatarURL;
    }

    public void setAvatarURL(String avatarURL) {
        this.avatarURL = avatarURL;
    }

}
