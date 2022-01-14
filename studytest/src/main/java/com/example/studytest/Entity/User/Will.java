package com.example.studytest.Entity.User;

import lombok.Data;

@Data
public class Will {
    private String email;
    private String willingness_interview;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWillingness_interview() {
        return willingness_interview;
    }

    public void setWillingness_interview(String willingness_interview) {
        this.willingness_interview = willingness_interview;
    }
}
