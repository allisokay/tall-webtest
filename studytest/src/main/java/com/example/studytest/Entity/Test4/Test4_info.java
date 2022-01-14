package com.example.studytest.Entity.Test4;

import lombok.Data;

import javax.persistence.*;

@Entity(name = "aural_wm")
public class Test4_info {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String part_email;
    private Integer number;
    private String trial_index;
    private String trial_type;
    private String exp_type; //新增字段
    private String user_answer; // 新增字段
    private String correct_answer; // 新增字段
//    private String word;
//    private String word_rate;
    private String letter;
    private String letter_rate;
    private String sentence;
    private String sentence_rate;
    private String total_item;
    private String total_sentence_rate;
    private String rt;
    private String exp_date;
    private String exp_Session;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPart_email() {
        return part_email;
    }

    public void setPart_email(String part_email) {
        this.part_email = part_email;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getTrial_index() {
        return trial_index;
    }

    public void setTrial_index(String trial_index) {
        this.trial_index = trial_index;
    }

    public String getTrial_type() {
        return trial_type;
    }

    public void setTrial_type(String trial_type) {
        this.trial_type = trial_type;
    }

    public String getExp_type() {
        return exp_type;
    }

    public void setExp_type(String exp_type) {
        this.exp_type = exp_type;
    }

    public String getUser_answer() {
        return user_answer;
    }

    public void setUser_answer(String user_answer) {
        this.user_answer = user_answer;
    }

    public String getCorrect_answer() {
        return correct_answer;
    }

    public void setCorrect_answer(String correct_answer) {
        this.correct_answer = correct_answer;
    }

    public String getLetter() {
        return letter;
    }

    public void setLetter(String letter) {
        this.letter = letter;
    }

    public String getLetter_rate() {
        return letter_rate;
    }

    public void setLetter_rate(String letter_rate) {
        this.letter_rate = letter_rate;
    }

    public String getSentence() {
        return sentence;
    }

    public void setSentence(String sentence) {
        this.sentence = sentence;
    }

    public String getSentence_rate() {
        return sentence_rate;
    }

    public void setSentence_rate(String sentence_rate) {
        this.sentence_rate = sentence_rate;
    }

    public String getTotal_item() {
        return total_item;
    }

    public void setTotal_item(String total_item) {
        this.total_item = total_item;
    }

    public String getTotal_sentence_rate() {
        return total_sentence_rate;
    }

    public void setTotal_sentence_rate(String total_sentence_rate) {
        this.total_sentence_rate = total_sentence_rate;
    }

    public String getRt() {
        return rt;
    }

    public void setRt(String rt) {
        this.rt = rt;
    }

    public String getExp_date() {
        return exp_date;
    }

    public void setExp_date(String exp_date) {
        this.exp_date = exp_date;
    }

    public String getExp_Session() {
        return exp_Session;
    }

    public void setExp_Session(String exp_Session) {
        this.exp_Session = exp_Session;
    }

    @Override
    public String toString() {
        return "Test4_info{" +
                "id=" + id +
                ", part_email='" + part_email + '\'' +
                ", number=" + number +
                ", trial_index='" + trial_index + '\'' +
                ", trial_type='" + trial_type + '\'' +
                ", exp_type='" + exp_type + '\'' +
                ", user_answer='" + user_answer + '\'' +
                ", correct_answer='" + correct_answer + '\'' +
                ", letter='" + letter + '\'' +
                ", letter_rate='" + letter_rate + '\'' +
                ", sentence='" + sentence + '\'' +
                ", sentence_rate='" + sentence_rate + '\'' +
                ", total_item='" + total_item + '\'' +
                ", total_sentence_rate='" + total_sentence_rate + '\'' +
                ", rt='" + rt + '\'' +
                ", exp_date='" + exp_date + '\'' +
                ", exp_Session='" + exp_Session + '\'' +
                '}';
    }
}
