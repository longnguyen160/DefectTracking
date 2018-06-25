package com.capstone.defecttracking.models.Project;

import java.util.ArrayList;

public class ProjectBacklogRequest {
    private String projectId;
    private ArrayList<String> backlog = new ArrayList<>();

    public ProjectBacklogRequest() {
    }

    public ProjectBacklogRequest(String projectId, ArrayList<String> backlog) {
        this.projectId = projectId;
        this.backlog = backlog;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public ArrayList<String> getBacklog() {
        return backlog;
    }

    public void setBacklog(ArrayList<String> backlog) {
        this.backlog = backlog;
    }

}
