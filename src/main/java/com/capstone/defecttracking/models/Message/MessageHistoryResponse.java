package com.capstone.defecttracking.models.Message;

import com.capstone.defecttracking.models.Issue.IssueHistoryResponse;
import com.capstone.defecttracking.models.User.UserResponse;

import java.util.Date;

public class MessageHistoryResponse {
    private String id;
    private IssueHistoryResponse issue;
    private String message;
    private String type;
    private UserResponse sender;
    private Date createdAt;
    private Date updatedAt;

    public MessageHistoryResponse() {
    }

    public MessageHistoryResponse(String id, IssueHistoryResponse issue, String message, String type, UserResponse sender, Date createdAt, Date updatedAt) {
        this.id = id;
        this.issue = issue;
        this.message = message;
        this.type = type;
        this.sender = sender;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public IssueHistoryResponse getIssue() {
        return issue;
    }

    public void setIssue(IssueHistoryResponse issue) {
        this.issue = issue;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public UserResponse getSender() {
        return sender;
    }

    public void setSender(UserResponse sender) {
        this.sender = sender;
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
}
