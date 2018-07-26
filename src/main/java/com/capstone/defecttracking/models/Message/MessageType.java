package com.capstone.defecttracking.models.Message;

public class MessageType {
    private String entityName; // logs va comments
    private String entityType;
    private String newEntityId;
    private String oldEntityId;
    private String rejectBy;

    public MessageType() {
    }

    public MessageType(String entityName, String entityType, String newEntityId, String oldEntityId, String rejectBy) {
        this.entityName = entityName;
        this.entityType = entityType;
        this.newEntityId = newEntityId;
        this.oldEntityId = oldEntityId;
        this.rejectBy = rejectBy;
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

    public String getNewEntityId() {
        return newEntityId;
    }

    public void setNewEntityId(String newEntityId) {
        this.newEntityId = newEntityId;
    }

    public String getOldEntityId() {
        return oldEntityId;
    }

    public void setOldEntityId(String oldEntityId) {
        this.oldEntityId = oldEntityId;
    }

    public String getRejectBy() {
        return rejectBy;
    }

    public void setRejectBy(String rejectBy) {
        this.rejectBy = rejectBy;
    }
}
