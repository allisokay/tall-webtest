package com.example.studytest.Repository.Test1;

import com.example.studytest.Entity.Test1.TestOneRecord;
import com.example.studytest.Entity.User.T_user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TestOneRepository  extends JpaRepository<TestOneRecord,Integer> {

    @Query(value = "select total_score from aural_vl where part_email=:email and total_score is not null", nativeQuery = true)
    String findScoreByEmail(@Param("email") String email);

    @Query(value = "select total_score from aural_vl where total_score is not null", nativeQuery = true)
    List<Integer> findAllScore();

    @Query(value = "select count(DISTINCT partEmail) from aural_vl")
    String findFinishNum();

    @Query(value = "select * from aural_vl where exp_date=:date", nativeQuery = true)
    List<TestOneRecord> findByDate(@Param("date") String date);

    @Query(value = "select max(id) from aural_vl",nativeQuery = true)
    int findMaxId();

    @Query(value = "select exp_type from aural_vl where part_email=:email",nativeQuery = true)
    List<String> findExpType(@Param("email") String email);

}
