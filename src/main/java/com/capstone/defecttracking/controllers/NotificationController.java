package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.Notification.NotificationRequest;
import com.capstone.defecttracking.models.Notification.NotificationResponse;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.models.User.UserDetailsSecurity;
import com.capstone.defecttracking.repositories.Notification.NotificationRepository;
import com.capstone.defecttracking.repositories.Notification.NotificationRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
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
public class NotificationController {

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    NotificationRepositoryCustom notificationRepositoryCustom;

    private SimpMessagingTemplate template;

    @Inject
    public NotificationController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @GetMapping("/user/getUnseenNotification")
    public long getUnseenNotification() {
        return notificationRepositoryCustom.getUnseenNotification();
    }

    @GetMapping("/user/getNotification")
    public NotificationResponse loadNotification() {
        return notificationRepositoryCustom.loadNotification();
    }

    @GetMapping("/user/getNotifications")
    public List<NotificationResponse> loadNotifications() {
        return notificationRepositoryCustom.loadNotifications();
    }

    @PostMapping("/user/setNotificationToSeen")
    public void setNotificationToSeen(@RequestBody String notificationId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();
        ServerResponse serverResponse;

        notificationRepositoryCustom.setNotificationToSeen(notificationId.substring(0, notificationId.length() - 1));
        serverResponse = new ServerResponse(true, "Notifications");

        template.convertAndSend("/topic/" + userDetailsSecurity.getId() + "/notification", serverResponse);
    }

    @PostMapping("/user/setNotificationToRead")
    public void setNotificationToRead(@RequestBody NotificationRequest notificationRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();
        ServerResponse serverResponse;

        notificationRepositoryCustom.setNotificationToRead(notificationRequest.getNotificationId(), notificationRequest.getNotificationType());
        serverResponse = new ServerResponse(true, "Notifications");

        template.convertAndSend("/topic/" + userDetailsSecurity.getId() + "/notification", serverResponse);
    }

    @PostMapping("/user/setAllNotificationsToSeen")
    public void setAllNotificationsToSeen() {
        notificationRepositoryCustom.setAllNotificationsToSeen();
    }

    @PostMapping("/user/setAllNotificationsToRead")
    public List<NotificationResponse> setAllNotificationsToRead() {
        notificationRepositoryCustom.setAllNotificationsToRead();

        return notificationRepositoryCustom.loadNotifications();
    }

    @PostMapping("/user/setAllNotificationsToDelete")
    public void setAllNotificationsToDelete() {
        notificationRepositoryCustom.setAllNotificationsToDelete();
    }
}
