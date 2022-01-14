package com.example.studytest.Controller.User;

import com.example.studytest.Entity.User.T_invite;
import com.example.studytest.Repository.User.T_inviteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/invite")
public class T_inviteController {
    @Autowired
    private T_inviteRepository t_inviteRepository;

//    查询邀请码
    @GetMapping("/findByCode{code}")
    public T_invite findByCode(@PathVariable("code") String code)
  {
        T_invite t_invite = t_inviteRepository.findByCode(code);
        return t_invite;
    }

    }



