package com.capstone.defecttracking.models.Project;

import java.util.ArrayList;

public class ProjectCategoryRequest {
    private Project project;
    private ArrayList<String> categories = new ArrayList<>();

    public ProjectCategoryRequest() {
    }

    public ProjectCategoryRequest(Project project, ArrayList<String> categories) {
        this.project = project;
        this.categories = categories;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public ArrayList<String> getCategories() {
        return categories;
    }

    public void setCategories(ArrayList<String> categories) {
        this.categories = categories;
    }
}
