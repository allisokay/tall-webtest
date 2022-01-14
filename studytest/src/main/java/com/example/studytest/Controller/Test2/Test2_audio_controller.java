package com.example.studytest.Controller.Test2;

import com.example.studytest.Entity.Test2.Test2_audio;
import com.example.studytest.Repository.Test2.Test2_audio_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/test2_audio")
public class Test2_audio_controller {
    @Autowired
    private Test2_audio_repository test2_audio_repository;
    @GetMapping("find_audio")
    public List<Test2_audio> findAll(){
        return test2_audio_repository.findAll();
    }
}

