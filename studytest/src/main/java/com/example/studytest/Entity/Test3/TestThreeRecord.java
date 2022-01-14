package com.example.studytest.Entity.Test3;
import lombok.Data;
import javax.persistence.*;

@Entity(name="aural_laa")
@Data
public class TestThreeRecord {
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
