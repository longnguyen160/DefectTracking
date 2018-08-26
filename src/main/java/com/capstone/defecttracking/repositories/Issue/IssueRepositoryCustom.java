package com.capstone.defecttracking.repositories.Issue;

import com.capstone.defecttracking.models.Filter.Filter;
import com.capstone.defecttracking.models.Issue.*;

import java.util.ArrayList;
import java.util.List;

public interface IssueRepositoryCustom {
    IssueDetailsResponse loadIssueDetails(String issueId);
    IssueShortcutResponse loadIssueShortcut(String issueId);
    Boolean didIssueExisted(String issueName);
    List<String> loadWatcherEmails(String issue);
    String generateIssueKey(String projectId);
    IssueListResponse loadAllIssues(IssueListRequest issueListRequest);
    IssueListResponse loadAllIssuesBasedOnFilter(IssueListRequest issueListRequest, Filter filter);
    IssueHomePageResponse loadAllIssuesShortcut(String userId);
    List<IssueBacklogResponse> loadAllIssuesInPhase(ArrayList<String> issueIds);
    List<IssueReportResponse> getIssueSummary(IssueReportRequest issueReportRequest);
    Boolean updateIssue(String issueId, String type, String value);
    Boolean updateIssueCategories(String issueId, String type, ArrayList<String> value);
    List<IssueShortcutResponse> searchIssue(String value);
    void addIssueToBacklog(String issueId, String projectId);
}
