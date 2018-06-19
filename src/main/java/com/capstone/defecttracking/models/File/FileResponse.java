package com.capstone.defecttracking.models.File;

public class FileResponse {
    private String contentType;
    private String name;
    private long size;

    public FileResponse() {
    }

    public FileResponse(String contentType, String name, long size) {
        this.contentType = contentType;
        this.name = name;
        this.size = size;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }
}
