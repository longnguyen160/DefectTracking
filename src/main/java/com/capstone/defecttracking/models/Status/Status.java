/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.models.Status;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author doanb
 */
@Document(collection = "status")
public class Status {

    @Id
    private String id;
    private String name;
    private String color;
    boolean isDefault;
    private List<String> handlers;

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

    public boolean isIsDefault() {
        return isDefault;
    }

    public void setIsDefault(boolean isDefault) {
        this.isDefault = isDefault;
    }

    public List<String> getHandlers() {
        return handlers;
    }

    public void setHandlers(List<String> handlers) {
        this.handlers = handlers;
    }

    public Status(String id, String name, String color, boolean isDefault, List<String> handlers) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.isDefault = isDefault;
        this.handlers = handlers;
    }

    public Status(String name, String color, boolean isDefault, List<String> handlers) {
        this.name = name;
        this.color = color;
        this.isDefault = isDefault;
        this.handlers = handlers;
    }

    public Status() {
    }

}
