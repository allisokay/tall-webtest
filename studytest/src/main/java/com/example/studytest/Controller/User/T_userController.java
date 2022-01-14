package com.example.studytest.Controller.User;

import com.example.studytest.Entity.User.Aural;
import com.example.studytest.Entity.User.T_user;
import com.example.studytest.Entity.User.Will;
import com.example.studytest.Entity.User.Word;
import com.example.studytest.Repository.User.T_userRepository;
import com.example.studytest.Util.PdfUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class T_userController {
    @Autowired
    private T_userRepository t_userRepository;

    @PostMapping("/save")
    public T_user save(@RequestBody T_user t_user) {
        T_user result = t_userRepository.save(t_user);
//        if(result!=null){
//            return "success";
//        }
//        else {
//            return "save fail";
//        }
        return result;
    }

    //查询邀请码是否存在
    @GetMapping("/findByCode{code}")
    public String findByCode(@PathVariable("code") String code) {
        String code1 = t_userRepository.findByCode(code);
        //如果t_user表中不存在这个邀请码，那么可以登录
        if (code1 == null) {
            return "success";
        } else {
            return "fail";
        }
    }

    // 新增方法：根据邮箱判断材料类型
    @RequestMapping("/findTypeByEmail")
    public String findTypeByEmail(@RequestParam String email) {
        //System.out.println("email = " + email);
        return t_userRepository.findType(email);
    }

    //查询邀请码是否存在
    @GetMapping("/findByEmail{email}")
    public String findByEmail(@PathVariable("email") String email) {
        String email1 = t_userRepository.findByEmail(email);
        //如果t_user表中不存在这个邮箱，那么可以登录
        if (email1 == null) {
            return "success";
        } else {
            return "fail";
        }
    }

    @GetMapping("/findAllByEmail{email}")
    public T_user findAllByEmail(@PathVariable("email") String email) {
        //如果t_user表中不存在这个邮箱，那么可以登录
        return t_userRepository.findAllByEmail(email);


    }
    @PostMapping("/update_aural")
    public int update_aural(@RequestBody Aural aural) {
        //更新正常返回1
        return t_userRepository.update_aural(aural.getAural_done(), aural.getAural_donetime(), aural.getEmail(), aural.getExp_type());

    }
    @PostMapping("/update_word")
    public int update_word(@RequestBody Word word) {

        return t_userRepository.update_word(word.getWord_done(), word.getWord_donetime(), word.getEmail(), word.getExp_type());


    }

    @PostMapping("/update_will")
    public int update_will(@RequestBody Will will) {

        return t_userRepository.update_will(will.getWillingness_interview(), will.getEmail());


    }


    @GetMapping("/downloadLetter/{name}/{date}")
    public void downloadReport(@PathVariable("name") String name,@PathVariable("date") String date, HttpServletResponse response)
    {
        Map<String, String> map = new HashMap();
        map.put("name",name);
        map.put("date",date);

        PdfUtils pdfUtils=new PdfUtils();
        String template_path = "/root/data/letter/agree_letter.pdf";
        String file_name = "letter_"+name+".pdf";
        String save_path = "/root/data/letter/all_letter/";

        //Windows:
//        String template_path = "C:\\agree_letter.pdf";
//        String file_name = "report_"+name+".pdf";
//        String save_path = "C:\\all_letter\\";
        pdfUtils.pdfout(template_path,file_name,save_path,map,response);
    }
}
