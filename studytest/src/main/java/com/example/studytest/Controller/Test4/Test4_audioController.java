package com.example.studytest.Controller.Test4;

import com.example.studytest.Entity.Test4.Test4_audio;
import com.example.studytest.Repository.Test4.Test4_audioRespository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/test4audio")
public class Test4_audioController {
    @Autowired
    private Test4_audioRespository test4_audioRespository;


    //查询音频源和相应描述
    @GetMapping("/audios")
    public List<Test4_audio> audios()
    {

        return test4_audioRespository.findAll();

    }



}
