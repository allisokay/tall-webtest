package com.example.studytest.Entity.User;

import lombok.Data;

@Data
public class Aural {
    private String aural_done;
    private String aural_donetime;
    private String exp_type; // 新增材料类型字段
    private String email;

    public String getAural_done() {
        return aural_done;
    }

    public void setAural_done(String aural_done) {
        this.aural_done = aural_done;
    }

    public String getAural_donetime() {
        return aural_donetime;
    }

    public void setAural_donetime(String aural_donetime) {
        this.aural_donetime = aural_donetime;
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
