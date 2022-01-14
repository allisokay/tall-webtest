package com.example.studytest.Entity.word.wm;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
@Data
public class Word_score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String email;
//    private String word_score;
    private String letter_score;
    private String sentence_score;
    private String session;
    private String date;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

/*    public String getWord_score() {
        return word_score;
    }

    public void setWord_score(String word_score) {
        this.word_score = word_score;
    }*/

    public String getLetter_score() {
        return letter_score;
    }

    public void setLetter_score(String letter_score) {
        this.letter_score = letter_score;
    }

    public String getSentence_score() {
        return sentence_score;
    }

    public void setSentence_score(String sentence_score) {
        this.sentence_score = sentence_score;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
