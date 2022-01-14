package com.example.studytest.Controller.word.word_sd;

import com.example.studytest.Entity.Test2.Aural_sd;
import com.example.studytest.Entity.word.sd.Word_sd;
import com.example.studytest.Repository.Test2.Aural_sd_repository;
import com.example.studytest.Repository.word.word_sd.Word_sdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/score_word")
public class Word_sdController {
    @Autowired
    Word_sdRepository word_sdRepository;
    @PostMapping("/save")
    public String saveUser(@RequestBody Word_sd word_sd){
        Word_sd word_sd1= word_sdRepository.save(word_sd);
        if(word_sd1==null)
        {
            return "fail";
        }
        else {
            return "success";
        }
    }
    @PostMapping("/saveAll")
    public String saveAll(@RequestBody List<Word_sd> word_sds) {
        List<String> results = new ArrayList<>();
        for (Word_sd word_sd : word_sds) {
            results.add(saveUser(word_sd));
        }
        for (String s : results) {
            if ("fail".equals(s)) {
                return "fail";
            }
        }
        return "success";
    }
}
