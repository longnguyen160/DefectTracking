package com.capstone.defecttracking.models.Issue;

public class IssueShortcutResponse {
    private String id;
    private String issueKey;
    private String summary;
    private String priority;
    private String status;

    public IssueShortcutResponse() {
    }

    public IssueShortcutResponse(String id, String issueKey, String summary, String priority, String status) {
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
