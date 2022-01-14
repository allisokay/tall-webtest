package com.example.studytest.Entity.Test2;

import lombok.Data;

import javax.persistence.*;

@Entity(name="aural_sd") //这个注解可以让它和表绑定
@Data
public class Aural_sd {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer test2_id;
    private String exp_name;
    private String exp_date;
    private String exp_type; // 新增字段，材料类型：试听版-->A/B
    private String exp_session;
    private String part_email;
    private String trail_type;
    private String test_session;
    private String time_elapsed;
    private String trial_index;
    private String stimulus;
    private String rt;
    private String part_response;
    private String correct_response;
    private String correct;
    private String total_score;
}
