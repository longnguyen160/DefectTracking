package com.capstone.defecttracking.models.Status;

public class StatusResponse {
    private String id;
    private String name;
    private String background;
    private String color;

    public StatusResponse(String id, String name, String background, String color) {
        this.id = id;
        this.name = name;
        this.background = background;
        this.color = color;
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
}
