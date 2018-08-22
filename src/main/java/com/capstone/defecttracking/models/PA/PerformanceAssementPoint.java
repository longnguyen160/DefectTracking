package com.capstone.defecttracking.models.PA;

public class PerformanceAssementPoint {
    private String criteria;
    private long value;

    public PerformanceAssementPoint(String criteria, long value) {
        this.criteria = criteria;
        this.value = value;
    }

    public PerformanceAssementPoint() {
    }

    public String getCriteria() {
        return criteria;
    }

    public void setCriteria(String criteria) {
        this.criteria = criteria;
    }

    public long getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
