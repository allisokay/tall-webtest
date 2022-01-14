package com.example.studytest.Controller.word.wm;

import com.example.studytest.Entity.Test4.Test4_info;
import com.example.studytest.Entity.Test4.Test4_info_total;
import com.example.studytest.Entity.word.wm.Wm;
import com.example.studytest.Entity.word.wm.Word_score;
import com.example.studytest.Repository.word.wm.WmRespository;
import com.example.studytest.Repository.word.wm.Word_scoreRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/word/wm")
public class Wmcontroller {
    @Autowired
    private WmRespository wmRespository;
    @Autowired
    private Word_scoreRespository word_scoreRespository;

    @PostMapping("/save_array")
    public String save_array(@RequestBody Test4_info_total test4_info_total) {
        List<Wm> results = new LinkedList<>();
        // 混合阶段
        if(test4_info_total.getLetter()!=null) {
            //先存前面的句子，一个句子一条记录
            for(int i=0;i<test4_info_total.getRt().length-1;i++) {
                Wm wm = new Wm();
                wm.setPart_email(test4_info_total.getPart_email());
                wm.setNumber(test4_info_total.getNumber()+i);
                wm.setTrial_index(test4_info_total.getTrial_index());
                wm.setTrial_type(test4_info_total.getTrial_type());
                wm.setExp_type(test4_info_total.getExp_type());
                if (i < test4_info_total.getUser_answer().length / 2) {
                    wm.setUser_answer(test4_info_total.getUser_answer()[i]);
                }
                wm.setSentence(test4_info_total.getSentence_array()[i]);
                wm.setSentence_rate(test4_info_total.getSentence_rate_array()[i]);
                wm.setTotal_item(test4_info_total.getTotal_item());
                wm.setTotal_sentence_rate(test4_info_total.getTotal_sentence_rate());
                wm.setExp_date(test4_info_total.getExp_date());
                wm.setExp_Session(test4_info_total.getExp_Session());
                wm.setRt(test4_info_total.getRt()[i]);
                results.add(wmRespository.save(wm));
            }
            //存最后一个字母的内容
            Wm wm = new Wm();
            wm.setPart_email(test4_info_total.getPart_email());
            wm.setNumber(test4_info_total.getNumber()+test4_info_total.getRt().length-1);
            wm.setTrial_index(test4_info_total.getTrial_index());
            wm.setTrial_type(test4_info_total.getTrial_type());
            wm.setExp_type(test4_info_total.getExp_type());
            String s = "";
            for (int i = test4_info_total.getUser_answer().length/2; i < test4_info_total.getUser_answer().length-1; i++) {
                s += test4_info_total.getUser_answer()[i] + ",";
            }
            s += test4_info_total.getUser_answer()[test4_info_total.getUser_answer().length-1];
            wm.setUser_answer(s);
            wm.setCorrect_answer(test4_info_total.getCorrect_answer());
            wm.setLetter(test4_info_total.getLetter());
            wm.setLetter_rate(test4_info_total.getLetter_rate());
            wm.setTotal_item(test4_info_total.getTotal_item());
            wm.setExp_date(test4_info_total.getExp_date());
            wm.setExp_Session(test4_info_total.getExp_Session());
            wm.setRt(test4_info_total.getRt()[test4_info_total.getRt().length-1]);
            results.add(wmRespository.save(wm));
        }
        for (Wm wm : results) {
            if (wm == null) {
                return "save fail";
            }
        }
        return "success";
    }

    @PostMapping("save_array_all")
    public String save_array_all(@RequestBody List<Test4_info_total> test4_info_totals) {
        List<String> results = new ArrayList<>();
        if (test4_info_totals == null) {
            return "save fail";
        }
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
    public String save(@RequestBody Wm wm) {
        Wm result = wmRespository.save(wm);
        if (result != null) {
            return "success";
        } else {
            return "save fail";
        }
    }

    @PostMapping("/saveAll")
    public String saveAll(@RequestBody List<Wm> wms) {
        List<String> results = new ArrayList<>();
        if (wms == null) {
            return "save fail";
        }
        for (Wm wm : wms) {
            results.add(save(wm));
        }
        for (String s : results) {
            if ("save fail".equals(s)) {
                return "save fail";
            }
        }
        return "success";
    }
    @PostMapping("/save_score")
    public String save_score(@RequestBody Word_score word_score) {
        Word_score result = word_scoreRespository.save(word_score);
        if (result != null) {
            return "success";
        } else {
            return "save fail";
        }
    }
    @GetMapping("/findScoreByEmail{email}")
    public Word_score findScoreByEmail(@PathVariable("email") String email){
        Word_score word_score = word_scoreRespository.findScoreByEmail(email);
        return word_score;
    }

    @GetMapping("/findAllScore")
    public List<Word_score> findAllScore()
    {
        return word_scoreRespository.findAll();
    }
}


