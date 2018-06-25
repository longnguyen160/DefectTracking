package com.capstone.defecttracking.models.Phase;

import com.capstone.defecttracking.models.Issue.IssuePhaseResponse;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.Date;

public class PhaseIssueResponse {
    @Id
    private String id;
    private String name;
    private Date startDate;
    private Date endDate;
    private Boolean starting;
    private ArrayList<IssuePhaseResponse> issueList = new ArrayList<>();

    public PhaseIssueResponse() {
    }

    public PhaseIssueResponse(String id, String name, Date startDate, Date endDate, Boolean starting, ArrayList<IssuePhaseResponse> issueList) {
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
        this.starting = starting;
    }

    public ArrayList<IssuePhaseResponse> getIssueList() {
        return issueList;
    }

    public void setIssueList(ArrayList<IssuePhaseResponse> issueList) {
        this.issueList = issueList;
    }
}
