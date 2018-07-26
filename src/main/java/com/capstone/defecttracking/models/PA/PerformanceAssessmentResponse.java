package com.capstone.defecttracking.models.PA;

import com.capstone.defecttracking.models.User.UserResponse;

public class PerformanceAssessmentResponse {
    private String position;
    private double point;
    private UserResponse user;

    public PerformanceAssessmentResponse() {
    }

    public PerformanceAssessmentResponse(String position, double point, UserResponse user) {
        this.position = position;
        this.point = point;
        this.user = user;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public double getPoint() {
        return point;
    }

    public void setPoint(double point) {
        this.point = point;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }
}
