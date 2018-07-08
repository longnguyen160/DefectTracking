package com.capstone.defecttracking.models.Issue;

import java.util.ArrayList;

public class IssueCategoriesRequest {
    private String issueId;
    private String type;
    private ArrayList<String> value = new ArrayList<>();

    public IssueCategoriesRequest() {
    }

    public IssueCategoriesRequest(String issueId, String type, ArrayList<String> value) {
        this.issueId = issueId;
        this.type = type;
        this.value = value;
    }

    public String getIssueId() {
        return issueId;
    }

    public void setIssueId(String issueId) {
        this.issueId = issueId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public ArrayList<String> getValue() {
        return value;
    }

    public void setValue(ArrayList<String> value) {
        this.value = value;
    }
}
