package com.capstone.defecttracking.models.PA;

import java.util.Date;

public class PerformanceAssessmentRequest {
    private String projectId;
    private Date from;
    private Date to;

    public PerformanceAssessmentRequest() {
    }

    public PerformanceAssessmentRequest(String projectId, Date from, Date to) {
        this.projectId = projectId;
        this.from = from;
        this.to = to;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public Date getFrom() {
        return from;
    }

    public void setFrom(Date from) {
        this.from = from;
    }

    public Date getTo() {
        return to;
    }

    public void setTo(Date to) {
        this.to = to;
    }
}
