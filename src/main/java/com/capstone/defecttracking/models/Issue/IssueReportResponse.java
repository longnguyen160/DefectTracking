package com.capstone.defecttracking.models.Issue;

import java.util.ArrayList;

public class IssueReportResponse {
    private String type;
    private ArrayList<Integer> data;

    public IssueReportResponse() {
    }

    public IssueReportResponse(String type, ArrayList<Integer> data) {
        this.type = type;
        this.data = data;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public ArrayList<Integer> getData() {
        return data;
    }

    public void setData(ArrayList<Integer> data) {
        this.data = data;
    }
}
