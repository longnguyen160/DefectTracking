package com.capstone.defecttracking.models.Server;

public class ServerResponse {
    private Boolean status;
    private String message;

    public ServerResponse(Boolean success, String message) {
        this.status = success;
        this.message = message;
    }

    public Boolean getSuccess() {
        return status;
    }

    public void setSuccess(Boolean status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
