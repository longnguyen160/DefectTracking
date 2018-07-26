package com.capstone.defecttracking.models.Message;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Document(collection = "messages")

public class Message {
    @Id
    private String id;
    private String issueId;
    private String message;
    private MessageType type;
    private String sender;
    private Boolean edited;
    @CreatedDate
    private Date createdAt;
    @LastModifiedDate
    private Date updatedAt;
    private ArrayList<String> attachments = new ArrayList<>();

    public Message() {
    }

    public Message(String id, String issueId, String message, MessageType type, String sender, Boolean edited, Date createdAt, Date updatedAt, ArrayList<String> attachments) {
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

    public Message(String issueId, String message, MessageType type, String sender, Boolean edited, Date createdAt, Date updatedAt, ArrayList<String> attachments) {
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

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
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
