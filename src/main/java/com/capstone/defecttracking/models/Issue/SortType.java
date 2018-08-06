package com.capstone.defecttracking.models.Issue;

public class SortType {
    private String id;
    private boolean desc;

    public SortType(String id, boolean desc) {
        this.id = id;
        this.desc = desc;
    }

    public SortType() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isDesc() {
        return desc;
    }

    public void setDesc(boolean desc) {
        this.desc = desc;
    }
}
