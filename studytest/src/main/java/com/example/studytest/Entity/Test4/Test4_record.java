package com.example.studytest.Entity.Test4;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity(name = "aural_record")
@Data
public class Test4_record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id = 0;
    private String email = "";
    private String recordType = "";
    private byte[] mp3 = null;
    private String date = "";
    private String session = "";
    private String type= "";

    public Test4_record(Integer id, String email, String recordType, byte[] mp3, String date, String session, String type) {
        this.id = id;
        this.email = email;
        this.recordType = recordType;
        this.mp3 = mp3;
        this.date = date;
        this.session = session;
        this.type = type;
    }

    public Test4_record(Integer id, byte[] mp3) {
        this.id = id;
        this.mp3 = mp3;
    }

    public Test4_record(String email, String recordType, byte[] mp3) {
        this.email = email;
        this.recordType = recordType;
        this.mp3 = mp3;
    }


    public Test4_record(String email, String recordType, byte[] mp3, String date, String session, String type) {
        this.id = id;
        this.email = email;
        this.recordType = recordType;
        this.mp3 = mp3;
        this.date = date;
        this.session = session;
        this.type = type;
    }

    public Test4_record() {

    }

    // private byte[] record;




}
