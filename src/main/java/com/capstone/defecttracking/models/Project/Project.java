package com.capstone.defecttracking.models.Project;

import com.capstone.defecttracking.models.User.UserRole;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Document(collection = "projects")

public class Project {
    @Id
    private String id;
    private String name;
    private String description;
    private String key;
    private String status;
    private ArrayList<UserRole> members = new ArrayList<>();
    private ArrayList<String> backlog = new ArrayList<>();
    @CreatedDate
    private Date createdAt;
    private boolean isClose = false;

    public Project() {
    }

    public Project(String id, String name, String description, String key, String status, ArrayList<UserRole> members, ArrayList<String> backlog, Date createdAt, boolean isClose) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.key = key;
        this.status = status;
        this.members = members;
        this.backlog = backlog;
        this.createdAt = createdAt;
        this.isClose = isClose;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public ArrayList<UserRole> getMembers() {
        return members;
    }

    public void setMembers(ArrayList<UserRole> members) {
        this.members = members;
    }

    public ArrayList<String> getBacklog() {
        return backlog;
    }

    public void setBacklog(ArrayList<String> backlog) {
        this.backlog = backlog;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isClose() {
        return isClose;
    }

    public void setClose(boolean close) {
        isClose = close;
    }
}
