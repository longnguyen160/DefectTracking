package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.Issue.Issue;
import com.capstone.defecttracking.models.Issue.IssueHistoryResponse;
import com.capstone.defecttracking.models.Mail.Mail;
import com.capstone.defecttracking.models.Message.Message;
import com.capstone.defecttracking.models.Message.MessageHistoryResponse;
import com.capstone.defecttracking.models.Message.MessageResponse;
import com.capstone.defecttracking.models.Message.MessageType;
import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.models.User.UserDetailsSecurity;
import com.capstone.defecttracking.repositories.Issue.IssueRepositoryCustom;
import com.capstone.defecttracking.repositories.Message.MessageRepository;
import com.capstone.defecttracking.repositories.Message.MessageRepositoryCustom;
import com.capstone.defecttracking.repositories.Project.ProjectRepositoryCustom;
import com.capstone.defecttracking.repositories.User.UserRepositoryCustom;
import com.capstone.defecttracking.services.EmailServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.inject.Inject;
import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
public class MessageController {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    MessageRepositoryCustom messageRepositoryCustom;

    @Autowired
    EmailServices emailService;

    @Autowired
    UserRepositoryCustom userRepositoryCustom;

    @Autowired
    ProjectRepositoryCustom projectRepositoryCustom;

    @Autowired
    IssueRepositoryCustom issueRepositoryCustom;


    private SimpMessagingTemplate template;

    @Inject
    public MessageController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @PostMapping("/user/createMessage")
    public ResponseEntity<?> createMessage(@RequestBody Message message) {
        ServerResponse serverResponse;
        Mail mail = new Mail();
        Map<String, Object> model = new HashMap<>();
        HttpServletRequest request = ((ServletRequestAttributes)Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String baseURL = String.format("%s://%s:%d/",request.getScheme(),  request.getServerName(), request.getServerPort());
        MessageType type = message.getType();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();

        if (!userDetailsSecurity.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN")) && type.getEntityName().equals("logs")) {
            type.setRejectBy(messageRepositoryCustom.checkReject(message));
        }
        message.setType(type);
        messageRepository.save(message);
        serverResponse = new ServerResponse(true, "Create message successfully");

        if (message.getType().getEntityName().equals("comments")) {
            template.convertAndSend("/topic/message", serverResponse);
        }

        User sender = userRepositoryCustom.findById(message.getSender());
        String src = sender.getProfile() != null  && sender.getProfile().getAvatarURL() != null ? sender.getProfile().getAvatarURL() : "/images/default_avatar.jpg";
        IssueHistoryResponse issue = messageRepositoryCustom.getIssueKey(message.getIssueId());
        String email = sender.getUsername() + " " + message.getMessage() + " on " + issue.getKey() + " - " + issue.getName();
        Project project = projectRepositoryCustom.getProject(message.getIssueId());

        model.put("src", baseURL + "files/?fileId=" + src);
        model.put("sender", sender.getUsername());
        model.put("message", message.getMessage());
        model.put("issueLink", baseURL + "issue/" + message.getIssueId());
        model.put("issueName", issue.getKey() + " - " + issue.getName());
        model.put("projectLink", baseURL + "project/" + project.getId() + "/dashboard");
        model.put("projectName", project.getName());

        mail.setFrom("no-reply@defecttracking.com");
        mail.setTo(issueRepositoryCustom
            .loadWatcherEmails(message.getIssueId())
            .stream()
            .filter(watcher -> !watcher.equals(sender.getEmail()))
            .toArray(String[]::new));
        mail.setSubject(email);
        mail.setModel(model);

        try {
            emailService.sendMail(mail);
        } catch (MessagingException | IOException e) {
            e.printStackTrace();
        }

        return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
    }

    @GetMapping("/user/loadAllMessagesOnIssue")
    public List<MessageResponse> loadAllMessagesOnIssue(@RequestParam(value = "issueId") String issueId, String type) {
        return messageRepositoryCustom.findAllMessagesOnIssue(issueId, type);
    }

    @GetMapping("/user/loadAllMessages")
    public List<MessageHistoryResponse> loadAllMessages() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();

        return messageRepositoryCustom.findAllMessages(userDetailsSecurity.getId());
    }
    @PostMapping("/user/editMessage")
    public ResponseEntity<?> editMessage(@RequestBody Message message) {
        ServerResponse serverResponse;

        if (messageRepositoryCustom.editMessage(message)) {
            serverResponse = new ServerResponse(true, "Edit message successfully");

            template.convertAndSend("/topic/message", serverResponse);
            return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
        }

        serverResponse = new ServerResponse(true, "Edit message failed");
        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
    }
}
