package com.example.studytest.Repository.User;

import com.example.studytest.Entity.User.T_invite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface T_inviteRepository extends JpaRepository<T_invite,Integer> {

    //这里是否需要改为返回类型为T_invite,可以商榷
    @Query(value = "select * from t_invite where t_invite.code=:code1", nativeQuery = true)
    T_invite findByCode(@Param("code1") String code1);


}
