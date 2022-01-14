package com.example.studytest.Repository.Test4;

import com.example.studytest.Entity.Test4.Test4_record;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface Aural_recordRespository extends JpaRepository<Test4_record,Integer> {
    public Test4_record findByIdIs(Integer id);
    public List<Test4_record> findAllByEmailIs(String email);
    //Test4_record findByEmailAndRecordTypeAndDateAndidIs(String email,String recordType,String data,int id);
    Test4_record findByidIs(Integer id);
    List<Test4_record> findByEmailIs(String email);
    Page<Test4_record> findAllByEmailIs(String email, Pageable var1);
    List<Test4_record> findAllByDateIs(String Date);
    List<Test4_record> findAllByDateAndTypeIs(String Date,String type);
    @Modifying
    @Transactional
    void deleteAllByEmailIs(String email);
}
