package com.example.studytest.Repository.Test4;

import com.example.studytest.Entity.Test4.Record_score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface Record_scoreRespository extends JpaRepository<Record_score,Integer> {
    @Query(value = "select * from record_score where record_score.email=:email1", nativeQuery = true)
    Record_score findScoreByEmail(@Param("email1") String email1);

//    @Transactional
//    @Modifying
//    @Query(value = "Update record_score r set r.score=:score where r.email=:email",nativeQuery = true)
//    void setRecordScore(@Param("score") String score,@Param("email") String email);

    @Modifying
    @Transactional
    @Query(value = "insert into record_score set email=:email,date=:date,session=:session ",nativeQuery = true)
    void setRecordScore(@Param("email") String email,@Param("date") String date, @Param("session") String session);

    @Query(value = "SELECT * FROM record_score WHERE date=:date",nativeQuery = true)
    List<Record_score> getUserbydate(@Param("date") String date);

    @Modifying
    @Transactional
    @Query(value = "UPDATE record_score SET score =:score WHERE email =:email",nativeQuery = true)
    void setScoreByEmail(@Param("score") String score,@Param("email") String email);

    @Query(value = "select score from record_score r where r.email=:email and r.session='First'",nativeQuery = true)
    String getFirstScoreByEmail(@Param("email") String email);

    @Query(value = "select score from record_score r where r.email=:email and r.session='Second'",nativeQuery = true)
    String getSecondScoreByEmail(@Param("email") String email);

    @Query(value = "select count(email) FROM record_score WHERE session = 'First'",nativeQuery = true)
    String getFirstEmailNum();

    @Query(value = "select count(email) FROM record_score WHERE session = 'Second'",nativeQuery = true)
    String getSecondEmailNum();

}
