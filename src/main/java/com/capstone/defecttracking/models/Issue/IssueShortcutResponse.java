package com.capstone.defecttracking.models.Issue;

import com.capstone.defecttracking.models.Status.StatusResponse;

import java.util.Date;

public class IssueShortcutResponse {
    private String id;
    private String issueKey;
    private String summary;
    private String priority;
    private Date createdAt;
    private StatusResponse status;

    public IssueShortcutResponse() {
    }

    public IssueShortcutResponse(String id, String issueKey, String summary, String priority, Date createdAt, StatusResponse status) {
        this.id = id;
        this.issueKey = issueKey;
        this.summary = summary;
        this.priority = priority;
        this.createdAt = createdAt;
        this.status = status;
    }

    public IssueShortcutResponse(String id, String issueKey, String summary, String priority, StatusResponse status) {
        this.id = id;
        this.issueKey = issueKey;
        this.summary = summary;
        this.priority = priority;
        this.status = status;
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

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public StatusResponse getStatus() {
        return status;
    }

    public void setStatus(StatusResponse status) {
        this.status = status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
