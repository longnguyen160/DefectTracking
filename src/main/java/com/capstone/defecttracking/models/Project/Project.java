package com.capstone.defecttracking.models.Project;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "projects")

public class Project {
    @Id
    private String id;

    private String name;
    private String description;
    private String status;
    private ArrayList<String> members = new ArrayList<String>();

    public Project() {
    }

    public Project(String id, String name, String description, String status, ArrayList<String> members) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.members = members;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public ArrayList<String> getMembers() {
        return members;
    }

    public void setMembers(String members) {
        this.members.add(members);
    }
}
