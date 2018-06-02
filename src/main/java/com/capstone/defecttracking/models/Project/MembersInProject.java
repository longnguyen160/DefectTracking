package com.capstone.defecttracking.models.Project;

import java.util.ArrayList;

public class MembersInProject {
    private ArrayList<String> userId = new ArrayList<String>();

    public MembersInProject(ArrayList<String> userId) {
        this.userId = userId;
    }

    public ArrayList<String> getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId.add(userId);
    }
}
