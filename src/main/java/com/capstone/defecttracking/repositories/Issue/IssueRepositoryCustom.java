package com.capstone.defecttracking.repositories.Issue;

import com.capstone.defecttracking.models.Issue.Issue;
import com.capstone.defecttracking.models.Issue.IssueResponse;

import java.util.List;

public interface IssueRepositoryCustom {
    Issue findById(String issueId);
    Boolean didIssueExisted(String issueName);
    List<Issue> loadAllIssuesInProject(String projectId);
    List<IssueResponse> loadAllIssues(String userId);
}
