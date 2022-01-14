package com.example.studytest.Controller.word.laa;

import com.example.studytest.Entity.word.laa.Laa;
import com.example.studytest.Repository.word.laa.LaaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Laa")
public class LaaControlller {

    @Autowired
    LaaRepository laaRepository;

    @PostMapping("/sendLaaData")
    public String saveTestOneData(@RequestBody Laa laa){
        Laa result = laaRepository.save(laa);
        if(result != null){
            return "success";
        }
        else {
            return "failure";
        }
    }
}
