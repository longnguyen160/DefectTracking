package com.capstone.defecttracking.models.Issue;

import java.util.ArrayList;
import java.util.Date;

public class IssueReportRequest {
    private String projectId;
    private ArrayList<String> status;
    private ArrayList<Date> dates;

    public IssueReportRequest() {
    }

    public IssueReportRequest(String projectId, ArrayList<String> status, ArrayList<Date> dates) {
        this.projectId = projectId;
        this.status = status;
        this.dates = dates;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public ArrayList<String> getStatus() {
        return status;
    }

    public void setStatus(ArrayList<String> status) {
        this.status = status;
    }

    public ArrayList<Date> getDates() {
        return dates;
    }

    public void setDates(ArrayList<Date> dates) {
        this.dates = dates;
    }
}
