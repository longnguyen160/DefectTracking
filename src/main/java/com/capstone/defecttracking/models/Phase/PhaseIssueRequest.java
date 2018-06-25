package com.capstone.defecttracking.models.Phase;

import java.util.ArrayList;

public class PhaseIssueRequest {
    private String phaseId;
    private ArrayList<String> issueList = new ArrayList<>();

    public PhaseIssueRequest() {
    }

    public PhaseIssueRequest(String phaseId, ArrayList<String> issueList) {
        this.phaseId = phaseId;
        this.issueList = issueList;
    }

    public String getPhaseId() {
        return phaseId;
    }

    public void setPhaseId(String phaseId) {
        this.phaseId = phaseId;
    }

    public ArrayList<String> getIssueList() {
        return issueList;
    }

    public void setIssueList(ArrayList<String> issueList) {
        this.issueList = issueList;
    }
}
