package com.example.studytest.Repository.Test4;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
public class Aural_recordRespositoryTest{
    @Autowired
    private Aural_recordRespository aural_recordRespository;

    @Test
    public void  findall(){
        aural_recordRespository.findAll();
    }
}