package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.Filter.Filter;
import com.capstone.defecttracking.models.Issue.*;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.models.User.UserDetailsSecurity;
import com.capstone.defecttracking.repositories.Issue.IssueRepository;
import com.capstone.defecttracking.repositories.Issue.IssueRepositoryCustom;
import com.capstone.defecttracking.repositories.Message.MessageRepository;
import com.capstone.defecttracking.repositories.Status.StatusRepositoryCustom;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class IssueController {

    @Autowired
    IssueRepository issueRepository;

    @Autowired
    IssueRepositoryCustom issueRepositoryCustom;

    @Autowired
    StatusRepositoryCustom statusRepositoryCustom;

    private SimpMessagingTemplate template;

    @Inject
    public IssueController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @PostMapping("/user/createIssue")
    public ResponseEntity<?> createIssue(@RequestBody Issue issue) {
        ServerResponse serverResponse;

        if (issueRepositoryCustom.didIssueExisted(issue.getIssueName())) {
            serverResponse = new ServerResponse(false, "An issue with that name already existed");

            return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
        }

        String issueKey = issueRepositoryCustom.generateIssueKey(issue.getProjectId());
        String statusId = statusRepositoryCustom.getDefaultStatus();
        String issueId = issueRepository.save(
                new Issue(
                        issue.getId(),
                        issue.getIssueName(),
                        issueKey,
                        issue.getProjectId(),
                        issue.getDescription(),
                        issue.getReporter(),
                        issue.getAssignee(),
                        statusId,
                        issue.getPriority(),
                        issue.getDueDate(),
                        issue.getCreatedAt(),
                        issue.getUpdatedAt(),
                        issue.getFinishedAt(),
                        issue.getWatchers(),
                        issue.getCategories(),
                        issue.getAttachments()
                )
        ).getId();

        issueRepositoryCustom.addIssueToBacklog(issueId, issue.getProjectId());
        serverResponse = new ServerResponse(true, "Create issue successfully");

        template.convertAndSend("/topic/issuesList", serverResponse);

        return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
    }

    @GetMapping("/admin/loadAllIssues")
    public IssueListResponse loadAllIssues(@RequestParam(value = "request") String request) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            IssueListRequest issueListRequest = objectMapper.readValue(request, IssueListRequest.class);

            return issueRepositoryCustom.loadAllIssues(issueListRequest);
        } catch (IOException e) {
            e.printStackTrace();

            return new IssueListResponse(new ArrayList<>(), 0);
        }
    }

    @GetMapping("/user/loadAllIssuesBasedOnFilter")
    public IssueListResponse loadAllIssuesBasedOnFilter(@RequestParam(value = "issueListRequest") String request, @RequestParam(value = "filter") String filterRequest) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            IssueListRequest issueListRequest = objectMapper.readValue(request, IssueListRequest.class);
            Filter filter = objectMapper.readValue(filterRequest, Filter.class);

            return issueRepositoryCustom.loadAllIssuesBasedOnFilter(issueListRequest, filter);
        } catch (IOException e) {
            e.printStackTrace();

            return new IssueListResponse(new ArrayList<>(), 0);
        }
    }

    @GetMapping("/user/loadAllIssuesShortcut")
    public IssueHomePageResponse loadAllIssuesShortcut(@RequestParam(value = "userId") String userId) {
        return issueRepositoryCustom.loadAllIssuesShortcut(userId);
    }

    @GetMapping("/user/loadAllIssuesFromBacklog")
    public List<IssueBacklogResponse> loadAllIssuesInPhase(@RequestParam(value = "issueIds") ArrayList<String> issueList) {
        return issueRepositoryCustom.loadAllIssuesInPhase(issueList);
    }

    @GetMapping("/user/loadIssueDetails")
    public IssueDetailsResponse loadIssueDetails(@RequestParam(value = "issueId") String issueId) {
        return issueRepositoryCustom.loadIssueDetails(issueId);
    }

    @GetMapping("/user/loadIssueShortcut")
    public IssueShortcutResponse loadIssueShortcut(@RequestParam(value = "issueId") String issueId) {
        return issueRepositoryCustom.loadIssueShortcut(issueId);
    }

    @PostMapping("/user/updateIssue")
    public ResponseEntity<?> updateIssue(@RequestBody IssueUpdateRequest data) {
        ServerResponse serverResponse;

        if (issueRepositoryCustom.updateIssue(data.getIssueId(), data.getType(), data.getValue())) {
            serverResponse = new ServerResponse(true, "Update issue successfully");

            template.convertAndSend("/topic/issue/update", serverResponse);
            if (data.getType().equals("status") || data.getType().equals("priority") || data.getType().equals("issueName")) {
                template.convertAndSend("/topic/issuesList", serverResponse);
            }

            return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
        }

        serverResponse = new ServerResponse(true, "Update issue failed");

        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/user/updateIssueCategories")
    public ResponseEntity<?> updateIssueCategories(@RequestBody IssueCategoriesRequest data) {
        ServerResponse serverResponse;

        if (issueRepositoryCustom.updateIssueCategories(data.getIssueId(), data.getType(), data.getValue())) {
            serverResponse = new ServerResponse(true, "Update issue successfully");

            template.convertAndSend("/topic/issue/update", serverResponse);
            return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
        }

        serverResponse = new ServerResponse(true, "Update issue failed");

        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/user/getIssueSummary")
    public List<IssueReportResponse> getIssueSummary(@RequestParam(value = "summaryRequest") String summaryRequest) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            IssueReportRequest issueReportRequest = objectMapper.readValue(summaryRequest, IssueReportRequest.class);

            return issueRepositoryCustom.getIssueSummary(issueReportRequest);
        } catch (IOException e) {
            e.printStackTrace();

            return new ArrayList<>();
        }
    }

    @DeleteMapping("/user/deleteIssue/{issueId}")
    public ResponseEntity<?> deleteIssue(@PathVariable("issueId") String issueId) {
        ServerResponse serverResponse;

        issueRepository.deleteById(issueId);
        serverResponse = new ServerResponse(Boolean.TRUE, "Delete issue successfully");

        template.convertAndSend("/topic/issuesList",serverResponse);
        return new ResponseEntity<>(serverResponse, HttpStatus.ACCEPTED);
    }
}
