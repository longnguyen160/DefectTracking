package com.capstone.defecttracking.repositories.Notification;

import com.capstone.defecttracking.models.Notification.NotificationResponse;

import java.util.List;

public interface NotificationRepositoryCustom {
    long getUnseenNotification();
    List<NotificationResponse> loadNotifications();
    NotificationResponse loadNotification();
    void setNotificationToSeen(String notificationId);
    void setNotificationToRead(String notificationId, String notificationType);
    void setAllNotificationsToSeen();
    void setAllNotificationsToRead();
    void setAllNotificationsToDelete();
}
