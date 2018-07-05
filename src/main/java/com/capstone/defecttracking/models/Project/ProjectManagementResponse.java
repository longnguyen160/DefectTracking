package com.capstone.defecttracking.models.Project;

import com.capstone.defecttracking.models.Category.CategoryProjectResponse;
import com.capstone.defecttracking.models.User.UserResponse;

import java.util.ArrayList;

public class ProjectManagementResponse {
    private String id;
    private String name;
    private String description;
    private ArrayList<UserResponse> manager;
    private ArrayList<CategoryProjectResponse> categories = new ArrayList<>();

    public ProjectManagementResponse() {
    }

    public ProjectManagementResponse(String id, String name, String description, ArrayList<UserResponse> manager, ArrayList<CategoryProjectResponse> categories) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.manager = manager;
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

    public ArrayList<UserResponse> getManager() {
        return manager;
    }

    public void setManager(ArrayList<UserResponse> manager) {
        this.manager = manager;
    }

    public ArrayList<CategoryProjectResponse> getCategories() {
        return categories;
    }

    public void setCategories(ArrayList<CategoryProjectResponse> categories) {
        this.categories = categories;
    }
}
