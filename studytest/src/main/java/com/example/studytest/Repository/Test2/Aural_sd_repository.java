package com.example.studytest.Repository.Test2;
import com.example.studytest.Entity.Test2.Aural_sd;
import com.example.studytest.Entity.word.vl.Vl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Aural_sd_repository extends JpaRepository<Aural_sd,Integer> {

    @Query(value = "select total_score from aural_sd where part_email=:email and total_score is not null", nativeQuery = true)
    String findScoreByEmail(@Param("email") String email);

    @Query(value = "select total_score from aural_sd where total_score is not null", nativeQuery = true)
    List<Integer> findAllScore();

    @Query(value = "select count(DISTINCT part_email) from aural_sd")
    String findFinishNum();

    @Query(value = "select * from aural_sd where exp_date=:date", nativeQuery = true)
    List<Aural_sd> findByDate(@Param("date") String date);
}
