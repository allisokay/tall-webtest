package com.example.studytest.Entity.word.laa;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="written_laa")
@Data
public class Laa {
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
    private String correctResponse;
    private String userResponse;
    private String userResponseStimulus;
    private String correct;
    private String totalScore;
}
