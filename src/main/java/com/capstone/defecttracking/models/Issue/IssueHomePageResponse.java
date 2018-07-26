package com.capstone.defecttracking.models.Issue;

import java.util.List;

public class IssueHomePageResponse {
    private List<IssueShortcutResponse> assigned;
    private List<IssueShortcutResponse> reported;

    public IssueHomePageResponse() {
    }

    public IssueHomePageResponse(List<IssueShortcutResponse> assigned, List<IssueShortcutResponse> reported) {
        this.assigned = assigned;
        this.reported = reported;
    }

    public List<IssueShortcutResponse> getAssigned() {
        return assigned;
    }

    public void setAssigned(List<IssueShortcutResponse> assigned) {
        this.assigned = assigned;
    }

    public List<IssueShortcutResponse> getReported() {
        return reported;
    }

    public void setReported(List<IssueShortcutResponse> reported) {
        this.reported = reported;
    }
}
