package com.example.studytest.Repository.word.vl;

import com.example.studytest.Entity.word.vl.Vl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VlRepository extends JpaRepository<Vl,Integer> {

    @Query(value = "select total_score from written_vl where part_email=:email and total_score is not null", nativeQuery = true)
    String findScoreByEmail(@Param("email") String email);

    @Query(value = "select total_score from written_vl where total_score is not null", nativeQuery = true)
    List<Integer> findAllScore();

    @Query(value = "select count(DISTINCT partEmail) from written_vl")
    String findFinishNum();

    @Query(value = "select * from written_vl where exp_date=:date", nativeQuery = true)
    List<Vl> findByDate(@Param("date") String date);
}
