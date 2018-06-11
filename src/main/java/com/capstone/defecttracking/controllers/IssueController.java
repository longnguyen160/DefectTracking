package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.Issue.Issue;
import com.capstone.defecttracking.models.Issue.IssueResponse;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
            serverResponse = new ServerResponse(false, "An issue with that name already exists");

            return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
        }

        issueRepository.save(issue);
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
}
