package com.capstone.defecttracking.models.Notification;

public class NotificationRequest {
    private String notificationId;
    private String notificationType;

    public NotificationRequest(String notificationId, String notificationType) {
        this.notificationId = notificationId;
        this.notificationType = notificationType;
    }

    public NotificationRequest() {
    }

    public String getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(String notificationId) {
        this.notificationId = notificationId;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }
}
