package com.capstone.defecttracking.models.Message;

import com.capstone.defecttracking.models.Notification.Notification;

public class MessageRequest {
    private Notification notification;
    private Message messageData;

    public MessageRequest(Notification notification, Message messageData) {
        this.notification = notification;
        this.messageData = messageData;
    }

    public MessageRequest() {
    }

    public Notification getNotification() {
        return notification;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }

    public Message getMessageData() {
        return messageData;
    }

    public void setMessageData(Message messageData) {
        this.messageData = messageData;
    }
}
