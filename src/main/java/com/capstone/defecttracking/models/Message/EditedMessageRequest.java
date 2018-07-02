package com.capstone.defecttracking.models.Message;

public class EditedMessageRequest {
    private String messageId;
    private String type;
    private String value;

    public EditedMessageRequest() {
    }

    public EditedMessageRequest(String messageId, String type, String value) {
        this.messageId = messageId;
        this.type = type;
        this.value = value;
    }

    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
