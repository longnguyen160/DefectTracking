package com.capstone.defecttracking.models.Issue;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Document(collection = "issues")

public class Issue {
    @Id
    private String id;

    private String issueName;
    private String projectId;
    private String description;
    private String reporter;
    private String assignee;
    private String status;
    private String priority;
    private Date dueDate;
    private Date createdAt;
    private ArrayList<String> label = new ArrayList<String>();
    private ArrayList<Attachment> attachment = new ArrayList<Attachment>();

    public Issue(String id, String issueName, String projectId, String description, String reporter, String assignee, String status, String priority, Date dueDate, Date createdAt, ArrayList<String> label, ArrayList<Attachment> attachment) {
        this.id = id;
        this.issueName = issueName;
        this.projectId = projectId;
        this.description = description;
        this.reporter = reporter;
        this.assignee = assignee;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
        this.label = label;
        this.attachment = attachment;
    }

    public Issue() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public ArrayList<String> getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label.add(label);
    }

    public ArrayList<Attachment> getAttachment() {
        return attachment;
    }

    public void setAttachment(Attachment attachment) {
        this.attachment.add(attachment);
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
}
