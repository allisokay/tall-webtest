package com.example.studytest.Repository.Admin;

import com.example.studytest.Entity.Admin.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AdminRepository extends JpaRepository<Admin,Integer> {
    @Query(value = "select id,account,pwd from admin where account=:account1", nativeQuery = true)
    Admin findByAccount(@Param("account1") String account1);
}
