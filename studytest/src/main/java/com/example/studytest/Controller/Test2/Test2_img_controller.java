package com.example.studytest.Controller.Test2;

import com.example.studytest.Entity.Test2.Test2_img;
import com.example.studytest.Repository.Test2.Test2_img_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/test2_img")
public class Test2_img_controller {
    @Autowired
    private Test2_img_repository test2_img_repository;
    @GetMapping("find_img")
    public List<Test2_img> findAll() {
        return test2_img_repository.findAll();
    }
}
