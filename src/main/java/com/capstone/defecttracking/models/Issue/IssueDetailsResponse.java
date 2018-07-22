package com.capstone.defecttracking.models.Issue;

import com.capstone.defecttracking.models.Category.CategoryProjectResponse;
import com.capstone.defecttracking.models.Status.Status;
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
    private Status status;
    private String priority;
    private Date dueDate;
    private Date createdAt;
    private Date updatedAt;
    private Date finishedAt;
    private ArrayList<UserResponse> watchers = new ArrayList<UserResponse>();
    private ArrayList<CategoryProjectResponse> categories = new ArrayList<>();
    private ArrayList<String> attachments = new ArrayList<String>();

    public IssueDetailsResponse() {
    }

    public IssueDetailsResponse(String id, String issueKey, String issueName, String projectId, String description, UserResponse reporter, UserResponse assignee, Status status, String priority, Date dueDate, Date createdAt, Date updatedAt, Date finishedAt, ArrayList<UserResponse> watchers, ArrayList<CategoryProjectResponse> categories, ArrayList<String> attachments) {
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
        this.finishedAt = finishedAt;
        this.watchers = watchers;
        this.categories = categories;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
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

    public Date getFinishedAt() {
        return finishedAt;
    }

    public void setFinishedAt(Date finishedAt) {
        this.finishedAt = finishedAt;
    }

    public ArrayList<CategoryProjectResponse> getCategories() {
        return categories;
    }

    public void setCategories(ArrayList<CategoryProjectResponse> categories) {
        this.categories = categories;
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
