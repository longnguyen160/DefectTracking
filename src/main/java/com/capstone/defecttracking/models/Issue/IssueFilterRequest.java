package com.capstone.defecttracking.models.Issue;

import com.capstone.defecttracking.models.Filter.Filter;

public class IssueFilterRequest {
    private IssueListRequest issueListRequest;
    private Filter filter;

    public IssueFilterRequest(IssueListRequest issueListRequest, Filter filter) {
        this.issueListRequest = issueListRequest;
        this.filter = filter;
    }

    public IssueFilterRequest() {
    }

    public IssueListRequest getIssueListRequest() {
        return issueListRequest;
    }

    public void setIssueListRequest(IssueListRequest issueListRequest) {
        this.issueListRequest = issueListRequest;
    }

    public Filter getFilter() {
        return filter;
    }

    public void setFilter(Filter filter) {
        this.filter = filter;
    }
}
