package com.capstone.defecttracking.models.Issue;

import java.util.List;

public class IssueListResponse {
    private List<IssueResponse> issues;
    private int pages;

    public IssueListResponse(List<IssueResponse> issues, int pages) {
        this.issues = issues;
        this.pages = pages;
    }

    public IssueListResponse() {
    }

    public List<IssueResponse> getIssues() {
        return issues;
    }

    public void setIssues(List<IssueResponse> issues) {
        this.issues = issues;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }
}
