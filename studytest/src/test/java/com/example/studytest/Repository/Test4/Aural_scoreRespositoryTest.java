package com.example.studytest.Repository.Test4;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
public class Aural_scoreRespositoryTest {
    @Autowired
    Aural_scoreRespository aural_scoreRespository;

    @Test
    public void test(){
        System.out.println(aural_scoreRespository.findAll());
    }

}