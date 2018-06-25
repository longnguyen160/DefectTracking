package com.capstone.defecttracking.models.Issue;

import java.util.ArrayList;

public class IssueListRequest {
    private ArrayList<String> issueList = new ArrayList<>();

    public IssueListRequest() {
    }

    public IssueListRequest(ArrayList<String> issueList) {
        this.issueList = issueList;
    }

    public ArrayList<String> getIssueList() {
        return issueList;
    }

    public void setIssueList(ArrayList<String> issueList) {
        this.issueList = issueList;
    }
}
