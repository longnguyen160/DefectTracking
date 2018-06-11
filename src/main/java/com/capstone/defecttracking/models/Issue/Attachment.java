package com.capstone.defecttracking.models.Issue;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "attachments")

public class Attachment {
    @Id
    private String id;

    private String fileName;
    private String url;
    private String type;

    public Attachment() {
    }

    public Attachment(String id, String fileName, String url, String type) {
        this.id = id;
        this.fileName = fileName;
        this.url = url;
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
