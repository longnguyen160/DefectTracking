package com.capstone.defecttracking.models.Project;

import com.capstone.defecttracking.models.Category.CategoryProjectResponse;
import com.capstone.defecttracking.models.User.UserRole;

import java.util.ArrayList;

public class ProjectDetailsResponse {
    private String id;
    private String name;
    private String description;
    private String status;
    private ArrayList<UserRole> members = new ArrayList<UserRole>();
    private ArrayList<String> backlog = new ArrayList<>();
    private ArrayList<CategoryProjectResponse> categories = new ArrayList<>();

    public ProjectDetailsResponse() {
    }

    public ProjectDetailsResponse(String id, String name, String description, String status, ArrayList<UserRole> members, ArrayList<String> backlog, ArrayList<CategoryProjectResponse> categories) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.members = members;
        this.backlog = backlog;
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

    public ArrayList<UserRole> getMembers() {
        return members;
    }

    public void setMembers(ArrayList<UserRole> members) {
        this.members = members;
    }

    public ArrayList<String> getBacklog() {
        return backlog;
    }

    public void setBacklog(ArrayList<String> backlog) {
        this.backlog = backlog;
    }

    public ArrayList<CategoryProjectResponse> getCategories() {
        return categories;
    }

    public void setCategories(ArrayList<CategoryProjectResponse> categories) {
        this.categories = categories;
    }
}
