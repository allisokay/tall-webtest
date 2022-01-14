package com.example.studytest.Controller.Test1;

import com.example.studytest.Entity.Test1.TestOneAudio;
import com.example.studytest.Entity.Test1.TestOneImg;
import com.example.studytest.Entity.Test1.TestOneRecord;
import com.example.studytest.Repository.Test1.TestOneAudioRepository;
import com.example.studytest.Repository.Test1.TestOneImgRepository;
import com.example.studytest.Repository.Test1.TestOneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/testOne")
public class TestOneController {
    @Autowired
    private TestOneImgRepository testOneImgRepository;
    @Autowired
    private TestOneAudioRepository testOneAudioRepository;
    @Autowired
    private TestOneRepository testOneRepository;

    @RequestMapping("/testOneImgs")
    public List<TestOneImg> imgs(){
        return testOneImgRepository.findAll();
    }

    @RequestMapping("/testOneAudios")
    public List<TestOneAudio> audios(){

        return testOneAudioRepository.findAll();
    }

    @PostMapping("/sendTestOneData")
    public String saveTestOneData(@RequestBody TestOneRecord testOneRecord){
        System.out.println(testOneRecord);
        TestOneRecord result = testOneRepository.save(testOneRecord);
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
    public String sendAllTestData(@RequestBody TestOneRecord recordLists[]) {
        System.out.println(recordLists);
        TestOneRecord result = null;
        boolean isRight = true;
        for (int i = 0; i < recordLists.length; i++) {
            result = testOneRepository.save(recordLists[i]);
            if (result != null) {
                System.out.println("success");
            } else {
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
    public int findMaxId() {
        System.out.println(testOneRepository.findMaxId());
        return testOneRepository.findMaxId();
    }

    @RequestMapping("/findExpType")
    public String find_ExpType(@RequestParam(value = "email") String email){
        System.out.println(email);
        List<String> result = testOneRepository.findExpType(email);
        int LastIndex = result.size()-1;
        return result.get(LastIndex);
    }

}
