/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.models.Filter;

import java.util.ArrayList;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author doanb
 */
@Document(collection = "filters")

public class Filter {

    @Id
    private String id;
    private ArrayList<String> status;
    private ArrayList<String> priority;
    private ArrayList<String> assignee;
    private ArrayList<String> reporter;
    private String projectId;
    private String userId;
    private ArrayList<String> categories = new ArrayList<>();

    public Filter() {
    }

    public Filter(String userId) {
        this.userId = userId;
    }

    public Filter(String id, ArrayList<String> status, ArrayList<String> priority, ArrayList<String> assignee, ArrayList<String> reporter, String projectId, String userId, ArrayList<String> categories) {
        this.id = id;
        this.status = status;
        this.priority = priority;
        this.assignee = assignee;
        this.reporter = reporter;
        this.projectId = projectId;
        this.userId = userId;
        this.categories = categories;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ArrayList<String> getStatus() {
        return status;
    }

    public void setStatus(ArrayList<String> status) {
        this.status = status;
    }

    public ArrayList<String> getPriority() {
        return priority;
    }

    public void setPriority(ArrayList<String> priority) {
        this.priority = priority;
    }

    public ArrayList<String> getAssignee() {
        return assignee;
    }

    public void setAssignee(ArrayList<String> assignee) {
        this.assignee = assignee;
    }

    public ArrayList<String> getReporter() {
        return reporter;
    }

    public void setReporter(ArrayList<String> reporter) {
        this.reporter = reporter;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public ArrayList<String> getCategories() {
        return categories;
    }

    public void setCategories(ArrayList<String> categories) {
        this.categories = categories;
    }
}
