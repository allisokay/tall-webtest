package com.example.studytest.Controller.Test4;

import com.example.studytest.Entity.Test4.Aural_score;
import com.example.studytest.Entity.Test4.Test4_info;
import com.example.studytest.Entity.Test4.Test4_info_total;
import com.example.studytest.Repository.Test4.Aural_scoreRespository;
import com.example.studytest.Repository.Test4.Test4_infoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.LinkedList;
import java.util.List;


@RestController
@RequestMapping("test4info")
public class Test4_infoController {
    @Autowired
    private Test4_infoRepository test4_infoRepository;
    @Autowired
    private Aural_scoreRespository aural_scoreRespository;



    /**
     * why
     * 接受全局变量的数组
     * @param
     */
    @PostMapping("/save_receiver")
    public String save_receiver(@RequestBody List<Test4_info> test4_infos){
        int flag = 0;
        if(test4_infos  == null){
            System.out.println("bean接受到的数组为空");
            return "fail";
        }
        for (Test4_info test4_info:test4_infos) {
            System.out.println("输出结果"+test4_info.toString());
            String result = save(test4_info);
            if ("success".equals(result)){
                flag = 1;
            }
        }
        if(flag == 1){
            return "success";
        }else {
            return "fail";
        }
    }

    @PostMapping("/save_array_receiver")
    public String save_array_receiver(@RequestBody List<Test4_info_total> test4_info_totals){
        int flag = 0;

        if(test4_info_totals  == null){
            System.out.println("test4_info_totals接受到的数组为空");
            return "fail";
        }
        for (Test4_info_total test4_info_total:test4_info_totals) {

            System.out.println("输出结果"+test4_info_total.toString());
            String result =   save_array(test4_info_total);
            if ("success".equals(result)){
                flag = 1;
            }
        }
        if(flag == 1) {
            return "success";
        } else {
            return "fail";
        }
    }


    @PostMapping("/save_array")
    public String save_array(@RequestBody Test4_info_total test4_info_total) {
        List<Test4_info> results = new LinkedList<>();
        if (test4_info_total.getLetter()!=null) {
            //存本组所有的句子，一个句子一条记录
            for(int i=0;i<test4_info_total.getRt().length-1;i++) {
                Test4_info test4_info = new Test4_info();
                test4_info.setPart_email(test4_info_total.getPart_email());
                test4_info.setNumber(test4_info_total.getNumber()+i);
                test4_info.setTrial_index(test4_info_total.getTrial_index());
                test4_info.setTrial_type(test4_info_total.getTrial_type());
                test4_info.setExp_type(test4_info_total.getExp_type());
                if (i < test4_info_total.getUser_answer().length / 2) {
                    test4_info.setUser_answer(test4_info_total.getUser_answer()[i]);
                }
                test4_info.setSentence(test4_info_total.getSentence_array()[i]);
                test4_info.setSentence_rate(test4_info_total.getSentence_rate_array()[i]);
                test4_info.setTotal_item(test4_info_total.getTotal_item());
                test4_info.setTotal_sentence_rate(test4_info_total.getTotal_sentence_rate());
                test4_info.setExp_date(test4_info_total.getExp_date());
                test4_info.setExp_Session(test4_info_total.getExp_Session());
                test4_info.setRt(test4_info_total.getRt()[i]);
                results.add(test4_infoRepository.save(test4_info));
            }
            //存本组所有的字母，仅一条记录
            Test4_info test4_info = new Test4_info();
            test4_info.setPart_email(test4_info_total.getPart_email());
            test4_info.setNumber(test4_info_total.getNumber()+test4_info_total.getRt().length-1);
            test4_info.setTrial_index(test4_info_total.getTrial_index());
            test4_info.setTrial_type(test4_info_total.getTrial_type());
            test4_info.setExp_type(test4_info_total.getExp_type());
            String s = "";
            for (int i = test4_info_total.getUser_answer().length/2; i < test4_info_total.getUser_answer().length-1; i++) {
                s += test4_info_total.getUser_answer()[i] + ",";
            }
            s += test4_info_total.getUser_answer()[test4_info_total.getUser_answer().length-1];
            test4_info.setUser_answer(s);
            test4_info.setCorrect_answer(test4_info_total.getCorrect_answer());
            test4_info.setLetter(test4_info_total.getLetter());
            test4_info.setLetter_rate(test4_info_total.getLetter_rate());
            test4_info.setTotal_item(test4_info_total.getTotal_item());
            test4_info.setExp_date(test4_info_total.getExp_date());
            test4_info.setExp_Session(test4_info_total.getExp_Session());
            test4_info.setRt(test4_info_total.getRt()[test4_info_total.getRt().length-1]);
            results.add(test4_infoRepository.save(test4_info));
        }
        for (Test4_info test4_info : results) {
            if (test4_info == null) {
                return "save fail";
            }
        }
        return "success";
    }

    @PostMapping("/save_array_all")
    public String save_array_all(@RequestBody List<Test4_info_total> test4_info_totals) {
        if (test4_info_totals == null) {
            return "save fail";
        }
        List<String> results = new LinkedList<>();
        for (Test4_info_total test4_info_total : test4_info_totals) {
            results.add(save_array(test4_info_total));
        }
        for (String s : results) {
            if ("save fail".equals(s)) {
                return "save fail";
            }
        }
        return "success";
    }

    @PostMapping("/save")
    public String save(@RequestBody Test4_info test4_info) {
        if( test4_info==null) {
            return "save fail";
        }
        Test4_info result = test4_infoRepository.save(test4_info);
        if (result != null) {
            System.out.println("success");
            return "success";
        } else {
            System.out.println("fail");
            return "save fail";
        }
    }

    @PostMapping("/saveAll")
    public String saveAll(@RequestBody List<Test4_info> test4_infos) {
        if (test4_infos == null) {
            return "save fail";
        }
        List<String> results = new LinkedList<>();
        for (Test4_info test4_info : test4_infos) {
            results.add(save(test4_info));
        }
        for (String s : results) {
            if ("save fail".equals(s)) {
                return "save fail";
            }
        }
        return "success";
    }

    @PostMapping("/save_score")
    public String save_score(@RequestBody Aural_score aural_score) {
        Aural_score result = aural_scoreRespository.save(aural_score);
        if (result != null) {
            return "success";
        } else {
            return "save fail";
        }

    }

    @GetMapping("/findScoreByEmail{email}")
    public Aural_score findScoreByEmail(@PathVariable("email") String email){
        return aural_scoreRespository.findScoreByEmail(email);
    }

    @GetMapping("/findAllScore")
    public List<Aural_score> findAllScore()
    {
        return aural_scoreRespository.findAll();
    }


    @GetMapping("/findall")
    public void findall() {
        List<Test4_info> tests = test4_infoRepository.findAll();
        for (Test4_info test : tests) {
            System.out.println(test.toString());
        }
    }
    
}
