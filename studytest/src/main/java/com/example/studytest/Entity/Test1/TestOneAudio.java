package com.example.studytest.Entity.Test1;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="test1_audio")
@Data
public class TestOneAudio {
    @Id
    private Integer audioIndex;
    private String audioSrc;
}
