package com.capstone.defecttracking.models.Status;

public class StatusResponse {
    private String id;
    private String name;
    private String background;
    private String color;
    private boolean isDone;

    public StatusResponse(String id, String name, String background, String color, boolean isDone) {
        this.id = id;
        this.name = name;
        this.background = background;
        this.color = color;
        this.isDone = isDone;
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

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }
}
