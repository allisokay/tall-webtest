package com.example.studytest.Entity.User;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
public class T_user {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String email;
    private String exp_type; // 新增字段，判断材料类型
    private String invited_code;
    private String part_consent;
    private String part_sex;
    private String part_edu;
    private String edu_discipline;
    private String crossdispl_info;
    private String Eng_YOL;
    private String foreigh_country; //新增生活过的外国城市
    private String study_time; //在国外学习多长时间
    private String nemt_grade;
	private String math_grade;
    private String chinese_grade;
    private String cet4_grade;
    private String cet6_grade;
    private String ielts_grade;
    private String toefl_grade;
    private String no_otherlan;
    private String russian_year;
    private String russian_test;
    private String russian_grade;
    private String japanese_year;
    private String japanese_test;
    private String japanese_grade;
    private String french_year;
    private String french_test;
    private String french_grade;
    private String german_year;
    private String german_test;
    private String german_grade;
    private String spanish_year;
    private String spanish_test;
    private String spanish_grade;
    private String other_name;
    private String other_year;
    private String other_test;
    private String other_grade;
    private String willingness_interview;
    private String aural_done;
    private String aural_donetime;
    private String word_done;
    private String word_donetime;
    private Date date;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
