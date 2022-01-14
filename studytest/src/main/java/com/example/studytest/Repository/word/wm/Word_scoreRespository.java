package com.example.studytest.Repository.word.wm;

import com.example.studytest.Entity.word.wm.Word_score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface Word_scoreRespository extends JpaRepository<Word_score,Integer> {
    @Query(value = "select * from word_score where word_score.email=:email1", nativeQuery = true)
    Word_score findScoreByEmail(@Param("email1") String email1);
}
