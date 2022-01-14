package com.example.studytest.Controller.Test2;


import com.example.studytest.Entity.Test2.Aural_sd;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.studytest.Repository.Test2.Aural_sd_repository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/score")
public class Aural_sd_controller {
    @Autowired
    Aural_sd_repository aural_sd_repository;

    @PostMapping("/save")
    public String saveUser(@RequestBody Aural_sd aural_sd){
        Aural_sd aural_sd1 = aural_sd_repository.save(aural_sd);
        if (aural_sd1 == null) {
            return "fail";
        } else {
            return "success";
        }
    }
    @PostMapping("/saveAll")
    public String saveAll(@RequestBody List<Aural_sd> aural_sds) {
        List<String> results = new ArrayList<>();
        for (Aural_sd aural_sd : aural_sds) {
            results.add(saveUser(aural_sd));
        }
        for (String s : results) {
            if ("fail".equals(s)) {
                return "fail";
            }
        }
        return "success";
    }
}



