package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.Issue.IssueHistoryResponse;
import com.capstone.defecttracking.models.Mail.Mail;
import com.capstone.defecttracking.models.Message.*;
import com.capstone.defecttracking.models.Notification.Notification;
import com.capstone.defecttracking.models.Notification.Recipient;
import com.capstone.defecttracking.models.Project.Project;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.models.User.UserDetailsSecurity;
import com.capstone.defecttracking.repositories.Issue.IssueRepositoryCustom;
import com.capstone.defecttracking.repositories.Message.MessageRepository;
import com.capstone.defecttracking.repositories.Message.MessageRepositoryCustom;
import com.capstone.defecttracking.repositories.Notification.NotificationRepository;
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
import java.util.*;

@RestController
public class MessageController {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    NotificationRepository notificationRepository;

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
    public ResponseEntity<?> createMessage(@RequestBody MessageRequest message) {
        ServerResponse serverResponse;
        Mail mail = new Mail();
        Map<String, Object> model = new HashMap<>();
        HttpServletRequest request = ((ServletRequestAttributes)Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String baseURL = String.format("%s://%s:%d/",request.getScheme(),  request.getServerName(), request.getServerPort());
        MessageType type = message.getMessageData().getType();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();

        if (!userDetailsSecurity.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN")) && type.getEntityName().equals("logs") && type.getEntityType().equals("status")) {
            type.setRejectBy(messageRepositoryCustom.checkReject(message.getMessageData()));
        }
        message.getMessageData().setType(type);
        messageRepository.save(message.getMessageData());
        notificationRepository.save(message.getNotification());

        if (type.getEntityType() != null && type.getEntityType().equals("assignee") && type.getOldEntityId() != null) {
            Notification notification = message.getNotification();
            List<Recipient> recipients = new ArrayList<>();
            recipients.add(new Recipient(
                type.getOldEntityId(),
                false,
                false,
                false
            ));
            notification.setMessage("remove you from issue ");
            notification.setRecipients(recipients);
            notificationRepository.save(notification);
            serverResponse = new ServerResponse(true, "Notification");

            template.convertAndSend("/topic/" + type.getOldEntityId() + "/notification", serverResponse);

        }

        serverResponse = new ServerResponse(true, "Create message successfully");

        if (type.getEntityName().equals("comments")) {
            template.convertAndSend("/topic/message", serverResponse);
        }

        serverResponse = new ServerResponse(true, "Notification");

        for (int i = 0; i < message.getNotification().getRecipients().size(); i++) {
            template.convertAndSend("/topic/" + message.getNotification().getRecipients().get(i).getUserId() + "/notification", serverResponse);
        }

        User sender = userRepositoryCustom.findById(message.getMessageData().getSender());
        String src = sender.getProfile() != null  && sender.getProfile().getAvatarURL() != null ? sender.getProfile().getAvatarURL() : "/images/default_avatar.jpg";
        IssueHistoryResponse issue = messageRepositoryCustom.getIssueKey(message.getMessageData().getIssueId());
        String email = sender.getUsername() + " " + message.getMessageData().getMessage() + " on " + issue.getKey() + " - " + issue.getName();
        Project project = projectRepositoryCustom.getProject(message.getMessageData().getIssueId());

        model.put("src", baseURL + "files/?fileId=" + src);
        model.put("sender", sender.getUsername());
        model.put("message", message.getMessageData().getMessage());
        model.put("issueLink", baseURL + "issue/" + message.getMessageData().getIssueId());
        model.put("issueName", issue.getKey() + " - " + issue.getName());
        model.put("projectLink", baseURL + "project/" + project.getId() + "/dashboard");
        model.put("projectName", project.getName());

        mail.setFrom("no-reply@defecttracking.com");
        mail.setTo(issueRepositoryCustom
            .loadWatcherEmails(message.getMessageData().getIssueId())
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
