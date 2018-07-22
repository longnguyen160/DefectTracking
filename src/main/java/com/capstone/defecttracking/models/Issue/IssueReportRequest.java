package com.capstone.defecttracking.models.Issue;

import java.util.ArrayList;
import java.util.Date;

public class IssueReportRequest {
    private String projectId;
    private ArrayList<Date> dates;

    public IssueReportRequest() {
    }

    public IssueReportRequest(String projectId, ArrayList<Date> dates) {
        this.projectId = projectId;
        this.dates = dates;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public ArrayList<Date> getDates() {
        return dates;
    }

    public void setDates(ArrayList<Date> dates) {
        this.dates = dates;
    }
}
