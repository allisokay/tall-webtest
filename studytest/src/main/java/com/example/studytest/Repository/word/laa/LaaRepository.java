package com.example.studytest.Repository.word.laa;

import com.example.studytest.Entity.word.laa.Laa;
import com.example.studytest.Entity.word.vl.Vl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LaaRepository extends JpaRepository<Laa,Integer> {
    @Query(value = "select total_score from written_laa where part_email=:email and total_score is not null", nativeQuery = true)
    String findScoreByEmail(@Param("email") String email);

    @Query(value = "select total_score from written_laa where total_score is not null", nativeQuery = true)
    List<Integer> findAllScore();

    @Query(value = "select count(DISTINCT partEmail) from written_laa")
    String findFinishNum();

    @Query(value = "select * from written_laa where exp_date=:date", nativeQuery = true)
    List<Laa> findByDate(@Param("date") String date);
}
