package com.capstone.defecttracking.models.Phase;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Document(collection = "phases")
public class Phase {
    @Id
    private String id;
    private String name;
    private String projectId;
    private Date startDate;
    private Date endDate;
    private Date completeDate;
    private String description;
    private Boolean isStarting;
    private ArrayList<String> issueList;

    public Phase() {
    }

    public Phase(String id, String name, String projectId, Date startDate, Date endDate, Date completeDate, String description, Boolean isStarting, ArrayList<String> issueList) {
        this.id = id;
        this.name = name;
        this.projectId = projectId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.completeDate = completeDate;
        this.description = description;
        this.isStarting = isStarting;
        this.issueList = issueList;
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

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Date getCompleteDate() {
        return completeDate;
    }

    public void setCompleteDate(Date completeDate) {
        this.completeDate = completeDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getStarting() {
        return isStarting;
    }

    public void setStarting(Boolean starting) {
        isStarting = starting;
    }

    public ArrayList<String> getIssueList() {
        return issueList;
    }

    public void setIssueList(ArrayList<String> issueList) {
        this.issueList = issueList;
    }
}
