package com.capstone.defecttracking.models.Category;

import com.capstone.defecttracking.models.Project.ProjectCategoryResponse;

import java.util.ArrayList;

public class CategoryManagementResponse {
    private String id;
    private String name;
    private String color;
    private String background;
    private ArrayList<ProjectCategoryResponse> projects = new ArrayList<>();

    public CategoryManagementResponse() {
    }

    public CategoryManagementResponse(String id, String name, String color, String background, ArrayList<ProjectCategoryResponse> projects) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.background = background;
        this.projects = projects;
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

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public ArrayList<ProjectCategoryResponse> getProjects() {
        return projects;
    }

    public void setProjects(ArrayList<ProjectCategoryResponse> projects) {
        this.projects = projects;
    }
}
