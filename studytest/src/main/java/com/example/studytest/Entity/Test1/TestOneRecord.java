package com.example.studytest.Entity.Test1;

import lombok.Data;

import javax.persistence.*;

@Entity(name="aural_vl")
@Data
public class TestOneRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String expName;
    private String expType;
    private String expDate;
    private String partEmail;
    private String expSession;
    private String trialType;
    private String testSession;
    private String timeElapsed;
    private String trialIndex;
    private String stimulus;
    private String rt;
    private String buttonPressed;
    private String userResponse;
    private String userResponseStimulus;
    private String correct;
    private String totalScore;

//    public Integer getTest1_id() {
//        return test1_id;
//    }
//
//    public void setTest1_id(Integer test1_id) {
//        this.test1_id = test1_id;
//    }
//
//    public Integer getUser_id() {
//        return user_id;
//    }
//
//    public void setUser_id(Integer user_id) {
//        this.user_id = user_id;
//    }
//
//    public String getReact_time() {
//        return react_time;
//    }
//
//    public void setReact_time(String react_time) {
//        this.react_time = react_time;
//    }
//
//    public Integer getTotal_score() {
//        return total_score;
//    }
//
//    public void setTotal_score(Integer total_score) {
//        this.total_score = total_score;
//    }
}