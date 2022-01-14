package com.example.studytest.Repository.Test3;

import com.example.studytest.Entity.Test1.TestOneRecord;
import com.example.studytest.Entity.Test3.TestThreeRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TestThreeRepository extends JpaRepository<TestThreeRecord,Integer> {

    @Query(value = "select total_score from aural_laa where part_email=:email and total_score is not null", nativeQuery = true)
    String findScoreByEmail(@Param("email") String email);

    @Query(value = "select total_score from aural_laa where total_score is not null", nativeQuery = true)
    List<Integer> findAllScore();

    @Query(value = "select count(DISTINCT partEmail) from aural_laa")
    String findFinishNum();

    @Query(value = "select * from aural_laa where exp_date=:date", nativeQuery = true)
    List<TestThreeRecord> findByDate(@Param("date") String date);

    @Query(value = "select max(id) from aural_laa ")
    int findMaxId();
}
