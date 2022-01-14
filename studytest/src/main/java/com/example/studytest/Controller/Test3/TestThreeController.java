package com.example.studytest.Controller.Test3;

import com.example.studytest.Entity.Test1.TestOneRecord;
import com.example.studytest.Entity.Test3.TestThreeAudio;
import com.example.studytest.Entity.Test3.TestThreeImg;
import com.example.studytest.Entity.Test3.TestThreeRecord;
import com.example.studytest.Repository.Test3.TestThreeAudioRepository;
import com.example.studytest.Repository.Test3.TestThreeImgRepository;
import com.example.studytest.Repository.Test3.TestThreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/testThree")
public class TestThreeController {

    @Autowired
    TestThreeRepository testThreeRepository;

    @Autowired
    private TestThreeImgRepository testThreeImgRepository;
    @Autowired
    private TestThreeAudioRepository testThreeAudioRepository;

    @RequestMapping("/testThreeImgs")
    public List<TestThreeImg> imgs(){
        return testThreeImgRepository.findAll();
    }

    @RequestMapping("/testThreeAudios")
    public List<TestThreeAudio> audios(){
        return testThreeAudioRepository.findAll();
    }

    @PostMapping("/sendTestThreeData")
    public String saveTestOneData(@RequestBody TestThreeRecord testThreeRecord){
        System.out.println(testThreeRecord);
        TestThreeRecord result = testThreeRepository.save(testThreeRecord);
        if(result != null){
            System.out.println("success");
            return "success";
        }
        else {
            System.out.println("failure");
            return "failure";
        }
    }
    @PostMapping("/sendAllTestData")
    public String sendAllTestData(@RequestBody TestThreeRecord recordLists[]) {
        System.out.println(recordLists);
        TestThreeRecord result = null;
        boolean isRight = true;
        for (int i = 0; i < recordLists.length; i++) {
            result = testThreeRepository.save(recordLists[i]);
            if (result != null) {
                System.out.println("success");
            }
            else {
                System.out.println("failure");
                isRight = false;
                break;
            }
        }
        if (isRight) {
            return "success";
        } else {
            return "failure";
        }
    }
    @RequestMapping("/findMaxId")
    public int findMaxId(){
        return testThreeRepository.findMaxId();
    }
}
