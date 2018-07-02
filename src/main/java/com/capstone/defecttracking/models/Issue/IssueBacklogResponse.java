package com.capstone.defecttracking.models.Issue;

import com.capstone.defecttracking.models.User.UserResponse;

public class IssueBacklogResponse {
    private String id;
    private String issueKey;
    private String summary;
    private UserResponse assignee;
    private String priority;
    private String status;

    public IssueBacklogResponse() {
    }

    public IssueBacklogResponse(String id, String issueKey, String summary, UserResponse assignee, String priority, String status) {
        this.id = id;
        this.issueKey = issueKey;
        this.summary = summary;
        this.assignee = assignee;
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

    public UserResponse getAssignee() {
        return assignee;
    }

    public void setAssignee(UserResponse assignee) {
        this.assignee = assignee;
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
