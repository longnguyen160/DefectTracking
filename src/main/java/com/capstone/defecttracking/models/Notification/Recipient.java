package com.capstone.defecttracking.models.Notification;

public class Recipient {
    private String userId;
    private boolean isRead;
    private boolean isDeleted;
    private boolean isSeen;

    public Recipient(String userId, boolean isRead, boolean isDeleted, boolean isSeen) {
        this.userId = userId;
        this.isRead = isRead;
        this.isDeleted = isDeleted;
        this.isSeen = isSeen;
    }

    public Recipient() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDelete(boolean delete) {
        isDeleted = delete;
    }

    public boolean isSeen() {
        return isSeen;
    }

    public void setSeen(boolean seen) {
        isSeen = seen;
    }
}
