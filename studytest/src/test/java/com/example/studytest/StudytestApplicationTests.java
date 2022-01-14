package com.example.studytest;

import com.example.studytest.Entity.Admin.Admin;
import com.example.studytest.Entity.Test4.Test4_info;
import com.example.studytest.Entity.Test4.Test4_record;
import com.example.studytest.Entity.User.T_invite;
import com.example.studytest.Entity.User.T_questionnaire;
import com.example.studytest.Entity.User.T_user;
import com.example.studytest.Repository.Admin.AdminRepository;
import com.example.studytest.Repository.Test4.Aural_recordRespository;
import com.example.studytest.Repository.Test4.Test4_audioRespository;
import com.example.studytest.Repository.Test4.Test4_infoRepository;
import com.example.studytest.Repository.User.T_inviteRepository;
import com.example.studytest.Repository.User.T_questionnaireRepository;
import com.example.studytest.Repository.User.T_userRepository;
import org.apache.commons.lang3.StringUtils;
import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.junit.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.ObjectUtils;

import java.util.List;

@SpringBootTest
public class StudytestApplicationTests {
    @Autowired
    private T_userRepository t_userRepository;
    @Autowired
    private T_inviteRepository t_inviteRepository;
    @Autowired
    private T_questionnaireRepository t_questionnaireRepository;
    @Autowired
    private Test4_audioRespository test4_audioRespository;
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private Test4_infoRepository test4_infoRepository;

    @Autowired
    private Aural_recordRespository aural_recordRespository;

    @Test
    public void test(){
        List<Test4_record> tests = aural_recordRespository.findAll();

        for (Test4_record test:tests) {
            System.out.println(test.toString());
        }
    }






    @Test
    public void findall(){
        List<Test4_info> tests =test4_infoRepository.findAll();
        for (Test4_info test:tests) {
            System.out.println(test.toString());
        }

    }
    @Test
    void contextLoads() {
    }
    @Test
    void sava_user(){

    }
    @Test
    void update_user(){
        T_user t_user = new T_user();

        int t_user1=t_userRepository.update_word("true","2020/12/10","xiaohuanhuan@qq.com", "A");
        System.out.println(t_user1);

    }
    @Test
    void findById(){
        T_invite t_invite = t_inviteRepository.findById(2).get();
        System.out.println(t_invite);
    }
    @Test
    void findByCode() {
        //这里需要结合T_inviteRepository中的修改来改
        T_invite t_invite = (T_invite) t_inviteRepository.findByCode("888");
        System.out.println(t_invite);
    }
    @Test
    void sava_questionnaire(){

    }

    @Test
    void findaudio() {

        String code = test4_audioRespository.findAll().toString();
        System.out.println(code);
    }
    @Test
    void findadmim() {

        String code = adminRepository.findAll().toString();
        System.out.println(code);
    }
    @Test
    void findByAccount() {

        Admin admin = adminRepository.findByAccount("wangzhenyu");
        System.out.println(admin);
        if(!ObjectUtils.isEmpty(admin))
        {
            System.out.println("admin is not null");
        }
        else{
            System.out.println("admin is null");
        }

    }

//    @Test
//    void findinfo() {
//
////        String code = test4_audioRespository.findAll().toString();
//
//        System.out.println( view_infoRepository.findAll());
//    }
    @Test
    void sava_test4_info(){
//        T_user t_user = new T_user();
//        t_user.setEmail("xiehuan@qq.com");
//        t_user.setInvited_code("666");
//        T_user t_user1=t_userRepository.save(t_user);
//        System.out.println(t_user1);
//        Test4_info test4_info = new Test4_info();
//        test4_info.setL_right("20");
//        test4_info.setS_right("30");
//        test4_info.setAccuracy("86.20%");
//        test4_info.setUser_id(48);
//        String[] ary = {"46", "38", "45"};
//        String str1= StringUtils.join(ary,'|');
//        test4_info.setReact_time(str1);


//        System.out.println(str1);
//        String[ ]str2=StringUtils.split(str1,"|");
//
//
//        for (String s : str2) {
//            System.out.println(s);
//        }
//        Test4_info test4_info1=test4_infoRepository.save(test4_info);
//        System.out.println(test4_info1);

    }
    @Test
    void findByCode1() {

        String code = t_userRepository.findByCode("555");
        System.out.println(code);
    }
    @Test
    void findByemail() {

        String email = t_userRepository.findByEmail("333@qq.com");
        System.out.println(email);
    }
    }
