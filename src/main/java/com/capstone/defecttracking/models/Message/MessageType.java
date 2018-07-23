package com.capstone.defecttracking.models.Message;

public class MessageType {
    private String entityName; // logs va comments
    private String entityType;
    private String entityId;

    public MessageType() {
    }

    public MessageType(String entityName, String entityType, String entityId) {
        this.entityName = entityName;
        this.entityType = entityType;
        this.entityId = entityId;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }
}
