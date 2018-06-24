package com.capstone.defecttracking.models.Phase;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.Date;

public class PhaseResponse {
    @Id
    private String id;
    private String name;
    private Date startDate;
    private Date endDate;
    private Boolean starting;
    private ArrayList<String> issueList;

    public PhaseResponse() {
    }

    public PhaseResponse(String id, String name, Date startDate, Date endDate, Boolean starting, ArrayList<String> issueList) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.starting = starting;
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

    public Boolean getStarting() {
        return starting;
    }

    public void setStarting(Boolean starting) {
        starting = starting;
    }

    public ArrayList<String> getIssueList() {
        return issueList;
    }

    public void setIssueList(ArrayList<String> issueList) {
        this.issueList = issueList;
    }
}
