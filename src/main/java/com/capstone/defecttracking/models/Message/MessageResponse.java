package com.capstone.defecttracking.models.Message;

import com.capstone.defecttracking.models.User.UserResponse;

import java.util.ArrayList;
import java.util.Date;

public class MessageResponse {
    private String id;
    private String issueId;
    private String message;
    private MessageType type;
    private UserResponse sender;
    private Boolean edited;
    private Date createdAt;
    private Date updatedAt;
    private ArrayList<String> attachments = new ArrayList<>();

    public MessageResponse() {
    }

    public MessageResponse(String id, String issueId, String message, MessageType type, UserResponse sender, Boolean edited, Date createdAt, Date updatedAt, ArrayList<String> attachments) {
        this.id = id;
        this.issueId = issueId;
        this.message = message;
        this.type = type;
        this.sender = sender;
        this.edited = edited;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.attachments = attachments;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIssueId() {
        return issueId;
    }

    public void setIssueId(String issueId) {
        this.issueId = issueId;
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

    public Boolean getEdited() {
        return edited;
    }

    public void setEdited(Boolean edited) {
        this.edited = edited;
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

    public ArrayList<String> getAttachments() {
        return attachments;
    }

    public void setAttachments(ArrayList<String> attachments) {
        this.attachments = attachments;
    }
}
