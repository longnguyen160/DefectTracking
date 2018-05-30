package com.capstone.defecttracking.models.Token;

import java.util.Date;

public class JwtAuthentication {
    private String token;
    private Date expiryDate;

    public JwtAuthentication(String token, Date expiryDate) {
        this.token = token;
        this.expiryDate = expiryDate;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }
}
