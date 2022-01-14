package com.example.studytest.Repository.Test4;

import com.example.studytest.Entity.Test4.Test4_info;
import com.example.studytest.Entity.word.laa.Laa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Test4_infoRepository  extends JpaRepository<Test4_info,Integer> {

    @Query(value = "select * from aural_wm where exp_date=:date", nativeQuery = true)
    List<Test4_info> findByDate(@Param("date") String date);
}
