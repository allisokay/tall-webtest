package com.example.studytest.Repository.User;

import com.example.studytest.Entity.User.T_user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface T_userRepository extends JpaRepository<T_user,Integer> {

    //这里是否需要改为返回类型为T_invite,可以商榷
    @Query(value = "select t_user.invited_code from t_user where t_user.invited_code=:code1", nativeQuery = true)
    String findByCode(@Param("code1") String code1);

    // 根据邮箱查询exp_type字段的值以判断用户是否是第一次参加测试
    @Query(value = "select t_user.exp_type from t_user where t_user.email=:email", nativeQuery = true)
    String findType(@Param("email") String email);

    @Query(value = "select t_user.email from t_user where t_user.email=:email1", nativeQuery = true)
    String findByEmail(@Param("email1") String email1);

    @Query(value = "select * from t_user where t_user.email=:email1", nativeQuery = true)
    T_user findAllByEmail(@Param("email1") String email1);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "update t_user set t_user.aural_done=:aural_done1,t_user.aural_donetime=:aural_donetime1, t_user.exp_type=:exp_type where t_user.email=:email1", nativeQuery = true)
    int update_aural(@Param("aural_done1") String aural_done1,@Param("aural_donetime1") String aural_donetime1,@Param("email1") String email1, @Param("exp_type") String exp_type);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "update t_user set t_user.willingness_interview=:willingness_interview1 where t_user.email=:email1", nativeQuery = true)
    int update_will(@Param("willingness_interview1") String willingness_interview1,@Param("email1") String email1);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "update t_user set t_user.word_done=:word_done1,t_user.word_donetime=:word_donetime1, t_user.exp_type=:exp_type where t_user.email=:email1", nativeQuery = true)
    int update_word(@Param("word_done1") String word_done1,@Param("word_donetime1") String word_donetime1,@Param("email1") String email1, @Param("exp_type") String exp_type);
//    @Transactional
//    @Modifying(clearAutomatically = true)
//    @Query(value = "update t_user set t_user.aural_done=?1,t_user.aural_donetime=?2 where t_user.email=?3")
//    int receipt(String arual_done, String aural_donetime, String email);
}