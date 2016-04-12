package com.chicagocars.domain;

public class VerificationResponse {

    private long userId;

    public VerificationResponse() {
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "VerificationResponse{" +
                "userId=" + userId +
                '}';
    }
}
