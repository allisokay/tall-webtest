package com.example.studytest.Entity.Test3;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="test3_audio")
@Data
public class TestThreeAudio {
    @Id
    private Integer audioIndex;
    private String audioSrc;
    private String audioDes;
}
