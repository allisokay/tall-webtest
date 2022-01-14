package com.example.studytest.Controller.word.vl;

import com.example.studytest.Entity.word.laa.Laa;
import com.example.studytest.Entity.word.vl.Vl;
import com.example.studytest.Repository.word.laa.LaaRepository;
import com.example.studytest.Repository.word.vl.VlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Vl")
public class VlController {
    @Autowired
    VlRepository vlRepository;

    @PostMapping("/sendVlData")
    public String saveTestOneData(@RequestBody Vl vl){
        Vl result = vlRepository.save(vl);
        if(result != null){
            return "success";
        }
        else {
            return "failure";
        }
    }
}
