package com.capstone.defecttracking.models.User;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "users")

public class User {
    @Id
    private String id;

    private String username;
    private String password;
    private String email;
    private ArrayList<String> roles = new ArrayList<String>();
    private UserProfile profile;

    public User() {
    }

    public User(String username, String password, String email, ArrayList<String> roles, UserProfile profile) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles;
        this.profile = profile;
    }

    public User(String id, String username, String email, ArrayList<String> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserProfile getProfile() {
        return profile;
    }

    public void setProfile(UserProfile profile) {
        this.profile = profile;
    }

    public ArrayList<String> getRoles() {
        return roles;
    }

    public void setRoles(String role) {
        roles.add(role);
    }
}
