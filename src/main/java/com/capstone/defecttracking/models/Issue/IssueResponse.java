package com.capstone.defecttracking.models.Issue;

import com.capstone.defecttracking.models.Status.StatusResponse;
import com.capstone.defecttracking.models.User.UserResponse;

import java.util.Date;

public class IssueResponse {
    private String id;
    private String issueKey;
    private String issueName;
    private UserResponse reporter;
    private UserResponse assignee;
    private StatusResponse status;
    private String priority;
    private Date dueDate;
    private Date createdAt;
    private Date finishedAt;

    public IssueResponse() {
    }

    public IssueResponse(String id, String issueKey, String issueName, UserResponse reporter, UserResponse assignee, StatusResponse status, String priority, Date dueDate, Date createdAt, Date finishedAt) {
        this.id = id;
        this.issueKey = issueKey;
        this.issueName = issueName;
        this.reporter = reporter;
        this.assignee = assignee;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
        this.finishedAt = finishedAt;
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

    public StatusResponse getStatus() {
        return status;
    }

    public void setStatus(StatusResponse status) {
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

    public Date getFinishedAt() {
        return finishedAt;
    }

    public void setFinishedAt(Date finishedAt) {
        this.finishedAt = finishedAt;
    }
}
