package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.Issue.*;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.models.User.UserDetailsSecurity;
import com.capstone.defecttracking.repositories.Issue.IssueRepository;
import com.capstone.defecttracking.repositories.Issue.IssueRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;

@RestController
public class IssueController {

    @Autowired
    IssueRepository issueRepository;

    @Autowired
    IssueRepositoryCustom issueRepositoryCustom;

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

        String issueKey = issueRepositoryCustom.generateIssueKey();
        String issueId = issueRepository.save(
            new Issue(
                issue.getId(),
                issue.getIssueName(),
                issueKey,
                issue.getProjectId(),
                issue.getDescription(),
                issue.getReporter(),
                issue.getAssignee(),
                issue.getStatus(),
                issue.getPriority(),
                issue.getDueDate(),
                issue.getCreatedAt(),
                issue.getUpdatedAt(),
                issue.getWatchers(),
                issue.getLabel(),
                issue.getAttachments()
            )
        ).getId();

        issueRepositoryCustom.addIssueToBacklog(issueId, issue.getProjectId());
        serverResponse = new ServerResponse(true, "Create issue successfully");

        template.convertAndSend("/topic/issuesList", serverResponse);

        return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
    }

    @GetMapping("/user/loadAllIssues")
    public List<IssueResponse> loadAllIssues() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();

        return issueRepositoryCustom.loadAllIssues(userDetailsSecurity.getId());
    }

    @GetMapping("user/loadAllIssuesBasedOnFilter")
    public List<IssueResponse> loadAllIssuesBasedOnFilter(@RequestParam(value = "value") String value, @RequestParam(value = "filter") String filter) {
        return issueRepositoryCustom.loadAllIssuesBasedOnFilter(value, filter);
    }

    @GetMapping("user/loadAllIssuesShortcut")
    public List<IssueShortcutResponse> loadAllIssuesShortcut(@RequestParam(value = "userId") String userId) {
        return issueRepositoryCustom.loadAllIssuesShortcut(userId);
    }

    @GetMapping("user/loadIssueDetails")
    public IssueDetailsResponse loadIssueDetails(@RequestParam(value = "issueId") String issueId) {
        return issueRepositoryCustom.loadIssueDetails(issueId);
    }

    @GetMapping("user/loadIssueShortcut")
    public IssueShortcutResponse loadIssueShortcut(@RequestParam(value = "issueId") String issueId) {
        return issueRepositoryCustom.loadIssueShortcut(issueId);
    }

    @PostMapping("user/updateIssue")
    public ResponseEntity<?> updateIssue(@RequestBody IssueUpdateRequest data) {
        ServerResponse serverResponse;

        if (issueRepositoryCustom.updateIssue(data.getIssueId(), data.getType(), data.getValue())) {
            serverResponse = new ServerResponse(true, "Update issue successfully");

            template.convertAndSend("/topic/issuesList", serverResponse);
            return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
        }

        serverResponse = new ServerResponse(true, "Update issue failed");

        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
    }
}
