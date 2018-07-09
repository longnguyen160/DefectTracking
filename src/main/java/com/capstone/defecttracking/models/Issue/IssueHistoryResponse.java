package com.capstone.defecttracking.models.Issue;

public class IssueHistoryResponse {
    private String id;
    private String name;
    private String key;

    public IssueHistoryResponse() {
    }

    public IssueHistoryResponse(String id, String name, String key) {
        this.id = id;
        this.name = name;
        this.key = key;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
