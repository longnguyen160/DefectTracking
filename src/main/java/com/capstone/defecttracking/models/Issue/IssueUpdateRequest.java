package com.capstone.defecttracking.models.Issue;

public class IssueUpdateRequest {
    private String issueId;
    private String type;
    private String value;

    public IssueUpdateRequest() {
    }

    public IssueUpdateRequest(String issueId, String type, String value) {
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

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
