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
    private String background;
    private String color;
    private boolean isDefault;
    private boolean isAssign;
    private boolean isDone;
    private List<String> handlers;

    public Status() {
    }

    public boolean isIsAssign() {
        return isAssign;
    }

    public void setIsAssign(boolean isAssign) {
        this.isAssign = isAssign;
    }

    public Status(String id, String name, String background, String color, boolean isDefault, List<String> handlers) {
        this.id = id;
        this.name = name;
        this.background = background;
        this.color = color;
        this.isDefault = isDefault;
        this.handlers = handlers;
    }

    public boolean isIsDefault() {
        return isDefault;
    }

    public void setIsDefault(boolean isDefault) {
        this.isDefault = isDefault;
    }

    public boolean isIsDone() {
        return isDone;
    }

    public void setIsDone(boolean isDone) {
        this.isDone = isDone;
    }

    public Status(String name, String background, String color, boolean isDefault, boolean isAssign, boolean isDone, List<String> handlers) {
        this.name = name;
        this.background = background;
        this.color = color;
        this.isDefault = isDefault;
        this.isAssign = isAssign;
        this.isDone = isDone;
        this.handlers = handlers;
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

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean isDefault) {
        this.isDefault = isDefault;
    }

    public List<String> getHandlers() {
        return handlers;
    }

    public void setHandlers(List<String> handlers) {
        this.handlers = handlers;
    }
}
