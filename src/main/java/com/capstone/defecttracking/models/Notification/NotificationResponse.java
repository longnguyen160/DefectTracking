package com.capstone.defecttracking.models.Notification;

import com.capstone.defecttracking.models.Issue.IssueHistoryResponse;
import com.capstone.defecttracking.models.Message.MessageType;
import com.capstone.defecttracking.models.Project.ProjectResponse;
import com.capstone.defecttracking.models.User.UserResponse;

import java.util.Date;

public class NotificationResponse {
    private String id;
    private IssueHistoryResponse issue;
    private ProjectResponse project;
    private String message;
    private MessageType type;
    private UserResponse sender;
    private boolean isRead;
    private Date createdAt;

    public NotificationResponse(String id, IssueHistoryResponse issue, String message, MessageType type, UserResponse sender, boolean isRead, Date createdAt) {
        this.id = id;
        this.issue = issue;
        this.message = message;
        this.type = type;
        this.sender = sender;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }

    public NotificationResponse(String id, ProjectResponse project, String message, UserResponse sender, boolean isRead, Date createdAt) {
        this.id = id;
        this.project = project;
        this.message = message;
        this.sender = sender;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }

    public NotificationResponse() {
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

    public ProjectResponse getProject() {
        return project;
    }

    public void setProject(ProjectResponse project) {
        this.project = project;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public UserResponse getSender() {
        return sender;
    }

    public void setSender(UserResponse sender) {
        this.sender = sender;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
