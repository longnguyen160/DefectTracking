package com.capstone.defecttracking.models.Issue;

import java.util.ArrayList;

public class IssueReportResponse {
    private String type;
    private ArrayList<Long> data;

    public IssueReportResponse() {
    }

    public IssueReportResponse(String type, ArrayList<Long> data) {
        this.type = type;
        this.data = data;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public ArrayList<Long> getData() {
        return data;
    }

    public void setData(ArrayList<Long> data) {
        this.data = data;
    }
}
