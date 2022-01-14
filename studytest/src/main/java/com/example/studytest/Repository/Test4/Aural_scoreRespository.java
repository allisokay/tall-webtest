package com.example.studytest.Repository.Test4;

import com.example.studytest.Entity.Test4.Aural_score;
import com.example.studytest.Entity.User.Aural;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface Aural_scoreRespository extends JpaRepository<Aural_score ,Integer> {
    @Query(value = "select * from aural_score where aural_score.email=:email1", nativeQuery = true)
    Aural_score findScoreByEmail(@Param("email1") String email1);
}
