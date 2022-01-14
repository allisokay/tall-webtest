package com.example.studytest.Controller.Admin;


import com.example.studytest.Entity.Test4.Record_score;
import com.example.studytest.Repository.Test4.Record_scoreRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recordScore")


public class RecordScoreController {

    @Autowired
    private Record_scoreRespository record_scoreRespository;

    @PostMapping("/setRecordScore")
    public void setRecordScore(@RequestParam(value = "email") String email,
                               @RequestParam(value = "date") String date,
                               @RequestParam(value = "session") String session)
    {
        record_scoreRespository.setRecordScore(email,date,session);
    }

    @RequestMapping("/getUserbyDate")
    public List<Record_score> getUserbyDate(@RequestParam(value = "date") String date){
        return record_scoreRespository.getUserbydate(date);
    }

    @PostMapping("/saveRecordScore")
    public String saveRecordScore(@RequestBody Record_score record_score){
        System.out.println(record_score);

        Record_score result = record_scoreRespository.save(record_score);

        if(result != null){
            System.out.println("success");
            return "success";
        }
        else {
            System.out.println("failure");
            return "failure";
        }
    }

    @RequestMapping("/getFirstScoreByEmail")
    public String getFirstScoreByEmail(@RequestParam(value = "email") String email){
        String result = record_scoreRespository.getFirstScoreByEmail(email);
        return result;
    }

    @RequestMapping("/getSecondScoreByEmail")
    public String getSecondScoreByEmail(@RequestParam(value = "email") String email){
        String result = record_scoreRespository.getSecondScoreByEmail(email);
        return result;
    }
}
