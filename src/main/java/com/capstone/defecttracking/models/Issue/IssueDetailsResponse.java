package com.capstone.defecttracking.models.Issue;

import com.capstone.defecttracking.models.User.UserResponse;

import java.util.ArrayList;
import java.util.Date;

public class IssueDetailsResponse {
    private String id;
    private String issueKey;
    private String issueName;
    private String projectId;
    private String description;
    private UserResponse reporter;
    private UserResponse assignee;
    private String status;
    private String priority;
    private Date dueDate;
    private Date createdAt;
    private Date updatedAt;
    private ArrayList<UserResponse> watchers = new ArrayList<UserResponse>();
    private ArrayList<String> label = new ArrayList<String>();
    private ArrayList<String> attachments = new ArrayList<String>();

    public IssueDetailsResponse() {
    }

    public IssueDetailsResponse(String id, String issueKey, String issueName, String projectId, String description, UserResponse reporter, UserResponse assignee, String status, String priority, Date dueDate, Date createdAt, Date updatedAt, ArrayList<UserResponse> watchers, ArrayList<String> label, ArrayList<String> attachments) {
        this.id = id;
        this.issueKey = issueKey;
        this.issueName = issueName;
        this.projectId = projectId;
        this.description = description;
        this.reporter = reporter;
        this.assignee = assignee;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.watchers = watchers;
        this.label = label;
        this.attachments = attachments;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIssueKey() {
        return issueKey;
    }

    public void setIssueKey(String issueKey) {
        this.issueKey = issueKey;
    }

    public String getIssueName() {
        return issueName;
    }

    public void setIssueName(String issueName) {
        this.issueName = issueName;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserResponse getReporter() {
        return reporter;
    }

    public void setReporter(UserResponse reporter) {
        this.reporter = reporter;
    }

    public UserResponse getAssignee() {
        return assignee;
    }

    public void setAssignee(UserResponse assignee) {
        this.assignee = assignee;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public ArrayList<String> getLabel() {
        return label;
    }

    public void setLabel(ArrayList<String> label) {
        this.label = label;
    }

    public ArrayList<String> getAttachments() {
        return attachments;
    }

    public void setAttachments(ArrayList<String> attachments) {
        this.attachments = attachments;
    }

    public ArrayList<UserResponse> getWatchers() {
        return watchers;
    }

    public void setWatchers(ArrayList<UserResponse> watchers) {
        this.watchers = watchers;
    }
}
