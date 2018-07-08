package com.capstone.defecttracking.models.Category;

public class CategoryProjectResponse {
    private String id;
    private String name;
    private String color;
    private String background;

    public CategoryProjectResponse() {
    }

    public CategoryProjectResponse(String id, String name, String color, String background) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.background = background;
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

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }
}
