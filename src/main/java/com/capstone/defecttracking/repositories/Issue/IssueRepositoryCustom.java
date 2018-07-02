package com.capstone.defecttracking.repositories.Issue;

import com.capstone.defecttracking.models.Issue.*;

import java.util.ArrayList;
import java.util.List;

public interface IssueRepositoryCustom {
    IssueDetailsResponse loadIssueDetails(String issueId);
    IssueShortcutResponse loadIssueShortcut(String issueId);
    Boolean didIssueExisted(String issueName);
    List<Issue> loadAllIssuesInProject(String projectId);
    String generateIssueKey();
    List<IssueResponse> loadAllIssues(String userId);
    List<IssueResponse>loadAllIssuesBasedOnFilter(String value, String filter);
    List<IssueShortcutResponse> loadAllIssuesShortcut(String userId);
    List<IssueBacklogResponse> loadAllIssuesInPhase(ArrayList<String> issueIds);
    Boolean updateIssue(String issueId, String type, String value);
    void addIssueToBacklog(String issueId, String projectId);
}
