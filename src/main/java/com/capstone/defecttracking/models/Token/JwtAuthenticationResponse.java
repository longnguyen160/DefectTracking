package com.capstone.defecttracking.models.Token;

public class JwtAuthenticationResponse {
    private JwtAuthentication accessToken;
    private String tokenType = "Bearer";

    public JwtAuthenticationResponse(JwtAuthentication accessToken) {
        this.accessToken = accessToken;
    }

    public JwtAuthentication getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(JwtAuthentication accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

}
