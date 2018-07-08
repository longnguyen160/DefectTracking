package com.capstone.defecttracking.models.Issue;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "issues")

public class Issue {
    @Id
    private String id;

    private String issueName;
    private String issueKey;
    private String projectId;
    private String description;
    private String reporter;
    private String assignee;
    private String status;
    private String priority;
    private Date dueDate;
    private Date createdAt;
    @LastModifiedDate
    private Date updatedAt;
    private ArrayList<String> watchers = new ArrayList<String>();
    private ArrayList<String> categories = new ArrayList<String>();
    private ArrayList<String> attachments = new ArrayList<String>();

    public Issue(String id, String issueName, String issueKey, String projectId, String description, String reporter, String assignee, String status, String priority, Date dueDate, Date createdAt, Date updatedAt, ArrayList<String> watchers, ArrayList<String> categories, ArrayList<String> attachments) {
        this.id = id;
        this.issueName = issueName;
        this.issueKey = issueKey;
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
        this.categories = categories;
        this.attachments = attachments;
    }

    public Issue() {
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

    public String getReporter() {
        return reporter;
    }

    public void setReporter(String reporter) {
        this.reporter = reporter;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public ArrayList<String> getCategories() {
        return categories;
    }

    public void setCategories(ArrayList<String> categories) {
        this.categories = categories;
    }

    public ArrayList<String> getAttachments() {
        return attachments;
    }

    public void setAttachments(ArrayList<String> attachments) {
        this.attachments = attachments;
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

    public ArrayList<String> getWatchers() {
        return watchers;
    }

    public void setWatchers(ArrayList<String> watchers) {
        this.watchers = watchers;
    }
}
