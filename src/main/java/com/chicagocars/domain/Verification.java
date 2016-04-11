package com.chicagocars.domain;

public class Verification {

    private long userId;

    public Verification(int userId) {
        this.userId = userId;
    }

    public Verification() {
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Verification{" +
                "userId=" + userId +
                '}';
    }
}
