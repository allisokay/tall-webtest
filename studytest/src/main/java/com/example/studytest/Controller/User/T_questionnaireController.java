package com.example.studytest.Controller.User;

import com.example.studytest.Entity.User.T_questionnaire;
import com.example.studytest.Repository.User.T_questionnaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/questionnaire")
public class T_questionnaireController {
    @Autowired
    private T_questionnaireRepository t_questionnaireRepository ;
    @PostMapping("/save")
    public String save(@RequestBody T_questionnaire t_questionnaire){
        T_questionnaire result = t_questionnaireRepository.save(t_questionnaire);
        if(result!=null){
            return "success";
        }
        else {
            return "save fail";
        }
//        return result;

    }
}
