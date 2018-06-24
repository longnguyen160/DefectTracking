package com.capstone.defecttracking.repositories.Issue;

import com.capstone.defecttracking.models.Issue.Issue;
import com.capstone.defecttracking.models.Issue.IssueDetailsResponse;
import com.capstone.defecttracking.models.Issue.IssueResponse;
import com.capstone.defecttracking.models.Issue.IssueShortcutResponse;

import java.util.List;

public interface IssueRepositoryCustom {
    IssueDetailsResponse loadIssueDetails(String issueId);
    Boolean didIssueExisted(String issueName);
    List<Issue> loadAllIssuesInProject(String projectId);
    String generateIssueKey();
    List<IssueResponse> loadAllIssues(String userId);
    List<IssueResponse>loadAllIssuesBasedOnFilter(String value, String filter);
    List<IssueShortcutResponse> loadAllIssuesShortcut(String userId);
    Boolean updateIssue(String issueId, String type, String value);
}
