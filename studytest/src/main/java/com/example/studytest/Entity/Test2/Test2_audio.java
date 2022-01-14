package com.example.studytest.Entity.Test2;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
@Entity //这个注解可以让它和表绑定
@Data
public class Test2_audio {
    @Id
    private Integer id;
    private String src;
}
