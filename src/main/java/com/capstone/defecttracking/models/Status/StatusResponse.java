/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.models.Status;

import java.util.List;

/**
 *
 * @author doanb
 */
public class StatusResponse {
    private String id;
    private String name;
    private String color;
    private List<String> handler;

    public StatusResponse(String id, String name, String color, List<String> handler) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.handler = handler;
    }

    public StatusResponse() {
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

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<String> getHandler() {
        return handler;
    }

    public void setHandler(List<String> handler) {
        this.handler = handler;
    }
    
}
