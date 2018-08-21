package com.capstone.defecttracking.models.Project;

import com.capstone.defecttracking.models.Category.CategoryProjectResponse;
import com.capstone.defecttracking.models.User.UserRole;

import java.util.ArrayList;
import java.util.Date;

public class ProjectDetailsResponse {
    private String id;
    private String name;
    private String description;
    private String status;
    private Date createdAt;
    private ArrayList<UserRole> members = new ArrayList<UserRole>();
    private ArrayList<CategoryProjectResponse> categories = new ArrayList<>();

    public ProjectDetailsResponse() {
    }

    public ProjectDetailsResponse(String id, String name, String description, String status, Date createdAt, ArrayList<UserRole> members, ArrayList<CategoryProjectResponse> categories) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.members = members;
        this.categories = categories;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public ArrayList<UserRole> getMembers() {
        return members;
    }

    public void setMembers(ArrayList<UserRole> members) {
        this.members = members;
    }

    public ArrayList<CategoryProjectResponse> getCategories() {
        return categories;
    }

    public void setCategories(ArrayList<CategoryProjectResponse> categories) {
        this.categories = categories;
    }
}
