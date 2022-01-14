package com.example.studytest.Entity.Test3;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;


@Entity(name="test3_img")
@Data
public class TestThreeImg {
    @Id
    private Integer imgIndex;
    private String imgSrc;
    private String imgDes;
}
