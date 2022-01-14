package com.example.studytest.Entity.User;

import lombok.Data;

@Data
public class Word {
    private String word_done;
    private String word_donetime;
    private String exp_type; // 新增材料类型字段
    private String email;

    public String getWord_done() {
        return word_done;
    }

    public void setWord_done(String word_done) {
        this.word_done = word_done;
    }

    public String getWord_donetime() {
        return word_donetime;
    }

    public void setWord_donetime(String word_donetime) {
        this.word_donetime = word_donetime;
    }

    public String getExp_type() {
        return exp_type;
    }

    public void setExp_type(String exp_type) {
        this.exp_type = exp_type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
