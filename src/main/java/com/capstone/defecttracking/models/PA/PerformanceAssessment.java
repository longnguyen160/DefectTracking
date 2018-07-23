/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.models.PA;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "performances")

public class PerformanceAssessment {
    @Id
        private String id;
        String name;
        String description;
        String among;
        boolean isgood;
        String role;

    public PerformanceAssessment(String id, String name, String description, String among, boolean isgood, String role) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.among = among;
        this.isgood = isgood;
        this.role = role;
    }

    public boolean isIsgood() {
        return isgood;
    }

    public void setIsgood(boolean isgood) {
        this.isgood = isgood;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAmong() {
        return among;
    }

    public void setAmong(String among) {
        this.among = among;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    
}
