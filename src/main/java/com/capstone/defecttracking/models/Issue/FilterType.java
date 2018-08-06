package com.capstone.defecttracking.models.Issue;

public class FilterType {
    private String id;
    private String value;

    public FilterType(String id, String value) {
        this.id = id;
        this.value = value;
    }

    public FilterType() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
