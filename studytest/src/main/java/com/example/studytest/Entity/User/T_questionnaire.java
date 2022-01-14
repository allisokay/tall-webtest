package com.example.studytest.Entity.User;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
public class T_questionnaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String user_major;
    private String user_edu;
    private String user_grade;
    private String user_sex;
    private String user_age;
    private Integer user_id;
}
