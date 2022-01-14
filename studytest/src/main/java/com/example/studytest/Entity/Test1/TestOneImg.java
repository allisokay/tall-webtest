package com.example.studytest.Entity.Test1;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;


@Entity(name="test1_img")
@Data
public class TestOneImg {
    @Id
    private Integer imgIndex;
    private String imgSrc;
    private String stimulus;
}
