package com.example.studytest.Repository.word.wm;

import com.example.studytest.Entity.Test4.Test4_info;
import com.example.studytest.Entity.User.T_user;
import com.example.studytest.Entity.word.wm.Wm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WmRespository extends JpaRepository<Wm,Integer> {
    @Query(value = "select * from written_wm where exp_date=:date", nativeQuery = true)
    List<Wm> findByDate(@Param("date") String date);
}
