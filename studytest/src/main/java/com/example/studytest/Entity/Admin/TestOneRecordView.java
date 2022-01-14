package com.example.studytest.Entity.Admin;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name="test_one_record_view")
@Data
public class TestOneRecordView {
    @Id
    @Column(name="test1_id")
    private Integer test1_id;
    private Integer user_id;
    private Date test1_begin_time;
    private Date test1_end_time;

    private String test1_ques1_corr_ans;
    private String test1_ques1_user_ans;
    private Integer test1_ques1_time;

    private String test1_ques2_corr_ans;
    private String test1_ques2_user_ans;
    private Integer test1_ques2_time;

    private String test1_ques3_corr_ans;
    private String test1_ques3_user_ans;
    private Integer test1_ques3_time;

    private String test1_ques4_corr_ans;
    private String test1_ques4_user_ans;
    private Integer test1_ques4_time;

    private String test1_ques5_corr_ans;
    private String test1_ques5_user_ans;
    private Integer test1_ques5_time;

    private String test1_ques6_corr_ans;
    private String test1_ques6_user_ans;
    private Integer test1_ques6_time;

    private String test1_ques7_corr_ans;
    private String test1_ques7_user_ans;
    private Integer test1_ques7_time;

    private String test1_ques8_corr_ans;
    private String test1_ques8_user_ans;
    private Integer test1_ques8_time;

    private String test1_ques9_corr_ans;
    private String test1_ques9_user_ans;
    private Integer test1_ques9_time;

    private String test1_ques10_corr_ans;
    private String test1_ques10_user_ans;
    private Integer test1_ques10_time;

    private String test1_ques11_corr_ans;
    private String test1_ques11_user_ans;
    private Integer test1_ques11_time;

    private String test1_ques12_corr_ans;
    private String test1_ques12_user_ans;
    private Integer test1_ques12_time;

    private String test1_ques13_corr_ans;
    private String test1_ques13_user_ans;
    private Integer test1_ques13_time;

    private String test1_ques14_corr_ans;
    private String test1_ques14_user_ans;
    private Integer test1_ques14_time;

    private String test1_ques15_corr_ans;
    private String test1_ques15_user_ans;
    private Integer test1_ques15_time;

    private String test1_ques16_corr_ans;
    private String test1_ques16_user_ans;
    private Integer test1_ques16_time;

    private String test1_ques17_corr_ans;
    private String test1_ques17_user_ans;
    private Integer test1_ques17_time;

    private String test1_ques18_corr_ans;
    private String test1_ques18_user_ans;
    private Integer test1_ques18_time;

    private String test1_ques19_corr_ans;
    private String test1_ques19_user_ans;
    private Integer test1_ques19_time;

    private String test1_ques20_corr_ans;
    private String test1_ques20_user_ans;
    private Integer test1_ques20_time;

    private Integer total_score;

//    public Object toList(){
//        Object[] attr = new Object[5];
//        return
//    }
    @Override
    public String toString() {
        return "" +
                test1_id +
                user_id +
                test1_ques1_corr_ans +
                test1_ques1_user_ans +
                test1_ques1_time +
                test1_ques2_corr_ans +
                test1_ques2_user_ans +
                test1_ques2_time +
                test1_ques3_corr_ans +
                test1_ques3_user_ans +
                test1_ques3_time +
                test1_ques4_corr_ans +
                test1_ques4_user_ans +
                test1_ques4_time +
                test1_ques5_corr_ans +
                test1_ques5_user_ans +
                test1_ques5_time +
                test1_ques6_corr_ans +
                test1_ques6_user_ans +
                test1_ques6_time +
                test1_ques7_corr_ans +
                test1_ques7_user_ans +
                test1_ques7_time +
                test1_ques8_corr_ans +
                test1_ques8_user_ans +
                test1_ques8_time +
                test1_ques9_corr_ans +
                test1_ques9_user_ans +
                test1_ques9_time +
                test1_ques10_corr_ans +
                test1_ques10_user_ans +
                test1_ques10_time +
                test1_ques11_corr_ans +
                test1_ques11_user_ans +
                test1_ques11_time +
                test1_ques12_corr_ans +
                test1_ques12_user_ans +
                test1_ques12_time +
                test1_ques13_corr_ans +
                test1_ques13_user_ans +
                test1_ques13_time +
                test1_ques14_corr_ans +
                test1_ques14_user_ans +
                test1_ques14_time +
                test1_ques15_corr_ans +
                test1_ques15_user_ans +
                test1_ques15_time +
                test1_ques16_corr_ans +
                test1_ques16_user_ans +
                test1_ques16_time +
                test1_ques17_corr_ans +
                test1_ques17_user_ans +
                test1_ques17_time +
                test1_ques18_corr_ans +
                test1_ques18_user_ans +
                test1_ques18_time +
                test1_ques19_corr_ans +
                test1_ques19_user_ans +
                test1_ques19_time +
                test1_ques20_corr_ans +
                test1_ques20_user_ans +
                test1_ques20_time +
                total_score;
    }

    public Integer getTest1_id() {
        return test1_id;
    }

    public void setTest1_id(Integer test1_id) {
        this.test1_id = test1_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public Date getTest1_begin_time() {
        return test1_begin_time;
    }

    public void setTest1_begin_time(Date test1_begin_time) {
        this.test1_begin_time = test1_begin_time;
    }

    public Date getTest1_end_time() {
        return test1_end_time;
    }

    public void setTest1_end_time(Date test1_end_time) {
        this.test1_end_time = test1_end_time;
    }

    public String getTest1_ques1_corr_ans() {
        return test1_ques1_corr_ans;
    }

    public void setTest1_ques1_corr_ans(String test1_ques1_corr_ans) {
        this.test1_ques1_corr_ans = test1_ques1_corr_ans;
    }

    public String getTest1_ques1_user_ans() {
        return test1_ques1_user_ans;
    }

    public void setTest1_ques1_user_ans(String test1_ques1_user_ans) {
        this.test1_ques1_user_ans = test1_ques1_user_ans;
    }

    public Integer getTest1_ques1_time() {
        return test1_ques1_time;
    }

    public void setTest1_ques1_time(Integer test1_ques1_time) {
        this.test1_ques1_time = test1_ques1_time;
    }

    public String getTest1_ques2_corr_ans() {
        return test1_ques2_corr_ans;
    }

    public void setTest1_ques2_corr_ans(String test1_ques2_corr_ans) {
        this.test1_ques2_corr_ans = test1_ques2_corr_ans;
    }

    public String getTest1_ques2_user_ans() {
        return test1_ques2_user_ans;
    }

    public void setTest1_ques2_user_ans(String test1_ques2_user_ans) {
        this.test1_ques2_user_ans = test1_ques2_user_ans;
    }

    public Integer getTest1_ques2_time() {
        return test1_ques2_time;
    }

    public void setTest1_ques2_time(Integer test1_ques2_time) {
        this.test1_ques2_time = test1_ques2_time;
    }

    public String getTest1_ques3_corr_ans() {
        return test1_ques3_corr_ans;
    }

    public void setTest1_ques3_corr_ans(String test1_ques3_corr_ans) {
        this.test1_ques3_corr_ans = test1_ques3_corr_ans;
    }

    public String getTest1_ques3_user_ans() {
        return test1_ques3_user_ans;
    }

    public void setTest1_ques3_user_ans(String test1_ques3_user_ans) {
        this.test1_ques3_user_ans = test1_ques3_user_ans;
    }

    public Integer getTest1_ques3_time() {
        return test1_ques3_time;
    }

    public void setTest1_ques3_time(Integer test1_ques3_time) {
        this.test1_ques3_time = test1_ques3_time;
    }

    public String getTest1_ques4_corr_ans() {
        return test1_ques4_corr_ans;
    }

    public void setTest1_ques4_corr_ans(String test1_ques4_corr_ans) {
        this.test1_ques4_corr_ans = test1_ques4_corr_ans;
    }

    public String getTest1_ques4_user_ans() {
        return test1_ques4_user_ans;
    }

    public void setTest1_ques4_user_ans(String test1_ques4_user_ans) {
        this.test1_ques4_user_ans = test1_ques4_user_ans;
    }

    public Integer getTest1_ques4_time() {
        return test1_ques4_time;
    }

    public void setTest1_ques4_time(Integer test1_ques4_time) {
        this.test1_ques4_time = test1_ques4_time;
    }

    public String getTest1_ques5_corr_ans() {
        return test1_ques5_corr_ans;
    }

    public void setTest1_ques5_corr_ans(String test1_ques5_corr_ans) {
        this.test1_ques5_corr_ans = test1_ques5_corr_ans;
    }

    public String getTest1_ques5_user_ans() {
        return test1_ques5_user_ans;
    }

    public void setTest1_ques5_user_ans(String test1_ques5_user_ans) {
        this.test1_ques5_user_ans = test1_ques5_user_ans;
    }

    public Integer getTest1_ques5_time() {
        return test1_ques5_time;
    }

    public void setTest1_ques5_time(Integer test1_ques5_time) {
        this.test1_ques5_time = test1_ques5_time;
    }

    public String getTest1_ques6_corr_ans() {
        return test1_ques6_corr_ans;
    }

    public void setTest1_ques6_corr_ans(String test1_ques6_corr_ans) {
        this.test1_ques6_corr_ans = test1_ques6_corr_ans;
    }

    public String getTest1_ques6_user_ans() {
        return test1_ques6_user_ans;
    }

    public void setTest1_ques6_user_ans(String test1_ques6_user_ans) {
        this.test1_ques6_user_ans = test1_ques6_user_ans;
    }

    public Integer getTest1_ques6_time() {
        return test1_ques6_time;
    }

    public void setTest1_ques6_time(Integer test1_ques6_time) {
        this.test1_ques6_time = test1_ques6_time;
    }

    public String getTest1_ques7_corr_ans() {
        return test1_ques7_corr_ans;
    }

    public void setTest1_ques7_corr_ans(String test1_ques7_corr_ans) {
        this.test1_ques7_corr_ans = test1_ques7_corr_ans;
    }

    public String getTest1_ques7_user_ans() {
        return test1_ques7_user_ans;
    }

    public void setTest1_ques7_user_ans(String test1_ques7_user_ans) {
        this.test1_ques7_user_ans = test1_ques7_user_ans;
    }

    public Integer getTest1_ques7_time() {
        return test1_ques7_time;
    }

    public void setTest1_ques7_time(Integer test1_ques7_time) {
        this.test1_ques7_time = test1_ques7_time;
    }

    public String getTest1_ques8_corr_ans() {
        return test1_ques8_corr_ans;
    }

    public void setTest1_ques8_corr_ans(String test1_ques8_corr_ans) {
        this.test1_ques8_corr_ans = test1_ques8_corr_ans;
    }

    public String getTest1_ques8_user_ans() {
        return test1_ques8_user_ans;
    }

    public void setTest1_ques8_user_ans(String test1_ques8_user_ans) {
        this.test1_ques8_user_ans = test1_ques8_user_ans;
    }

    public Integer getTest1_ques8_time() {
        return test1_ques8_time;
    }

    public void setTest1_ques8_time(Integer test1_ques8_time) {
        this.test1_ques8_time = test1_ques8_time;
    }

    public String getTest1_ques9_corr_ans() {
        return test1_ques9_corr_ans;
    }

    public void setTest1_ques9_corr_ans(String test1_ques9_corr_ans) {
        this.test1_ques9_corr_ans = test1_ques9_corr_ans;
    }

    public String getTest1_ques9_user_ans() {
        return test1_ques9_user_ans;
    }

    public void setTest1_ques9_user_ans(String test1_ques9_user_ans) {
        this.test1_ques9_user_ans = test1_ques9_user_ans;
    }

    public Integer getTest1_ques9_time() {
        return test1_ques9_time;
    }

    public void setTest1_ques9_time(Integer test1_ques9_time) {
        this.test1_ques9_time = test1_ques9_time;
    }

    public String getTest1_ques10_corr_ans() {
        return test1_ques10_corr_ans;
    }

    public void setTest1_ques10_corr_ans(String test1_ques10_corr_ans) {
        this.test1_ques10_corr_ans = test1_ques10_corr_ans;
    }

    public String getTest1_ques10_user_ans() {
        return test1_ques10_user_ans;
    }

    public void setTest1_ques10_user_ans(String test1_ques10_user_ans) {
        this.test1_ques10_user_ans = test1_ques10_user_ans;
    }

    public Integer getTest1_ques10_time() {
        return test1_ques10_time;
    }

    public void setTest1_ques10_time(Integer test1_ques10_time) {
        this.test1_ques10_time = test1_ques10_time;
    }

    public String getTest1_ques11_corr_ans() {
        return test1_ques11_corr_ans;
    }

    public void setTest1_ques11_corr_ans(String test1_ques11_corr_ans) {
        this.test1_ques11_corr_ans = test1_ques11_corr_ans;
    }

    public String getTest1_ques11_user_ans() {
        return test1_ques11_user_ans;
    }

    public void setTest1_ques11_user_ans(String test1_ques11_user_ans) {
        this.test1_ques11_user_ans = test1_ques11_user_ans;
    }

    public Integer getTest1_ques11_time() {
        return test1_ques11_time;
    }

    public void setTest1_ques11_time(Integer test1_ques11_time) {
        this.test1_ques11_time = test1_ques11_time;
    }

    public String getTest1_ques12_corr_ans() {
        return test1_ques12_corr_ans;
    }

    public void setTest1_ques12_corr_ans(String test1_ques12_corr_ans) {
        this.test1_ques12_corr_ans = test1_ques12_corr_ans;
    }

    public String getTest1_ques12_user_ans() {
        return test1_ques12_user_ans;
    }

    public void setTest1_ques12_user_ans(String test1_ques12_user_ans) {
        this.test1_ques12_user_ans = test1_ques12_user_ans;
    }

    public Integer getTest1_ques12_time() {
        return test1_ques12_time;
    }

    public void setTest1_ques12_time(Integer test1_ques12_time) {
        this.test1_ques12_time = test1_ques12_time;
    }

    public String getTest1_ques13_corr_ans() {
        return test1_ques13_corr_ans;
    }

    public void setTest1_ques13_corr_ans(String test1_ques13_corr_ans) {
        this.test1_ques13_corr_ans = test1_ques13_corr_ans;
    }

    public String getTest1_ques13_user_ans() {
        return test1_ques13_user_ans;
    }

    public void setTest1_ques13_user_ans(String test1_ques13_user_ans) {
        this.test1_ques13_user_ans = test1_ques13_user_ans;
    }

    public Integer getTest1_ques13_time() {
        return test1_ques13_time;
    }

    public void setTest1_ques13_time(Integer test1_ques13_time) {
        this.test1_ques13_time = test1_ques13_time;
    }

    public String getTest1_ques14_corr_ans() {
        return test1_ques14_corr_ans;
    }

    public void setTest1_ques14_corr_ans(String test1_ques14_corr_ans) {
        this.test1_ques14_corr_ans = test1_ques14_corr_ans;
    }

    public String getTest1_ques14_user_ans() {
        return test1_ques14_user_ans;
    }

    public void setTest1_ques14_user_ans(String test1_ques14_user_ans) {
        this.test1_ques14_user_ans = test1_ques14_user_ans;
    }

    public Integer getTest1_ques14_time() {
        return test1_ques14_time;
    }

    public void setTest1_ques14_time(Integer test1_ques14_time) {
        this.test1_ques14_time = test1_ques14_time;
    }

    public String getTest1_ques15_corr_ans() {
        return test1_ques15_corr_ans;
    }

    public void setTest1_ques15_corr_ans(String test1_ques15_corr_ans) {
        this.test1_ques15_corr_ans = test1_ques15_corr_ans;
    }

    public String getTest1_ques15_user_ans() {
        return test1_ques15_user_ans;
    }

    public void setTest1_ques15_user_ans(String test1_ques15_user_ans) {
        this.test1_ques15_user_ans = test1_ques15_user_ans;
    }

    public Integer getTest1_ques15_time() {
        return test1_ques15_time;
    }

    public void setTest1_ques15_time(Integer test1_ques15_time) {
        this.test1_ques15_time = test1_ques15_time;
    }

    public String getTest1_ques16_corr_ans() {
        return test1_ques16_corr_ans;
    }

    public void setTest1_ques16_corr_ans(String test1_ques16_corr_ans) {
        this.test1_ques16_corr_ans = test1_ques16_corr_ans;
    }

    public String getTest1_ques16_user_ans() {
        return test1_ques16_user_ans;
    }

    public void setTest1_ques16_user_ans(String test1_ques16_user_ans) {
        this.test1_ques16_user_ans = test1_ques16_user_ans;
    }

    public Integer getTest1_ques16_time() {
        return test1_ques16_time;
    }

    public void setTest1_ques16_time(Integer test1_ques16_time) {
        this.test1_ques16_time = test1_ques16_time;
    }

    public String getTest1_ques17_corr_ans() {
        return test1_ques17_corr_ans;
    }

    public void setTest1_ques17_corr_ans(String test1_ques17_corr_ans) {
        this.test1_ques17_corr_ans = test1_ques17_corr_ans;
    }

    public String getTest1_ques17_user_ans() {
        return test1_ques17_user_ans;
    }

    public void setTest1_ques17_user_ans(String test1_ques17_user_ans) {
        this.test1_ques17_user_ans = test1_ques17_user_ans;
    }

    public Integer getTest1_ques17_time() {
        return test1_ques17_time;
    }

    public void setTest1_ques17_time(Integer test1_ques17_time) {
        this.test1_ques17_time = test1_ques17_time;
    }

    public String getTest1_ques18_corr_ans() {
        return test1_ques18_corr_ans;
    }

    public void setTest1_ques18_corr_ans(String test1_ques18_corr_ans) {
        this.test1_ques18_corr_ans = test1_ques18_corr_ans;
    }

    public String getTest1_ques18_user_ans() {
        return test1_ques18_user_ans;
    }

    public void setTest1_ques18_user_ans(String test1_ques18_user_ans) {
        this.test1_ques18_user_ans = test1_ques18_user_ans;
    }

    public Integer getTest1_ques18_time() {
        return test1_ques18_time;
    }

    public void setTest1_ques18_time(Integer test1_ques18_time) {
        this.test1_ques18_time = test1_ques18_time;
    }

    public String getTest1_ques19_corr_ans() {
        return test1_ques19_corr_ans;
    }

    public void setTest1_ques19_corr_ans(String test1_ques19_corr_ans) {
        this.test1_ques19_corr_ans = test1_ques19_corr_ans;
    }

    public String getTest1_ques19_user_ans() {
        return test1_ques19_user_ans;
    }

    public void setTest1_ques19_user_ans(String test1_ques19_user_ans) {
        this.test1_ques19_user_ans = test1_ques19_user_ans;
    }

    public Integer getTest1_ques19_time() {
        return test1_ques19_time;
    }

    public void setTest1_ques19_time(Integer test1_ques19_time) {
        this.test1_ques19_time = test1_ques19_time;
    }

    public String getTest1_ques20_corr_ans() {
        return test1_ques20_corr_ans;
    }

    public void setTest1_ques20_corr_ans(String test1_ques20_corr_ans) {
        this.test1_ques20_corr_ans = test1_ques20_corr_ans;
    }

    public String getTest1_ques20_user_ans() {
        return test1_ques20_user_ans;
    }

    public void setTest1_ques20_user_ans(String test1_ques20_user_ans) {
        this.test1_ques20_user_ans = test1_ques20_user_ans;
    }

    public Integer getTest1_ques20_time() {
        return test1_ques20_time;
    }

    public void setTest1_ques20_time(Integer test1_ques20_time) {
        this.test1_ques20_time = test1_ques20_time;
    }

    public Integer getTotal_score() {
        return total_score;
    }

    public void setTotal_score(Integer total_score) {
        this.total_score = total_score;
    }
}
