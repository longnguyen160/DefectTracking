package com.capstone.defecttracking.models.PA;

import java.util.ArrayList;
import java.util.List;

public class PerformanceAssessmentSummaryResponse {
    private String username;
    private List<PerformanceAssementPoint> summary = new ArrayList<>();

    public PerformanceAssessmentSummaryResponse(String username, List<PerformanceAssementPoint> summary) {
        this.username = username;
        this.summary = summary;
    }

    public PerformanceAssessmentSummaryResponse() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<PerformanceAssementPoint> getSummary() {
        return summary;
    }

    public void setSummary(List<PerformanceAssementPoint> summary) {
        this.summary = summary;
    }
}
