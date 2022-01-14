package com.example.studytest.Controller.User;

import com.example.studytest.Entity.Test4.Aural_score;
import com.example.studytest.Entity.word.wm.Word_score;
import com.example.studytest.Repository.Test1.TestOneRepository;
import com.example.studytest.Repository.Test2.Aural_sd_repository;
import com.example.studytest.Repository.Test3.TestThreeRepository;
import com.example.studytest.Repository.Test4.Aural_scoreRespository;
import com.example.studytest.Repository.Test4.Record_scoreRespository;
import com.example.studytest.Repository.word.laa.LaaRepository;
import com.example.studytest.Repository.word.vl.VlRepository;
import com.example.studytest.Repository.word.wm.Word_scoreRespository;
import com.example.studytest.Repository.word.word_sd.Word_sdRepository;
import com.example.studytest.Util.PdfUtils;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private TestOneRepository testOneRepository;
    @Autowired
    private VlRepository vlRepository;


    @Autowired
    private Aural_sd_repository auralSdRepository;
    @Autowired
    private Word_sdRepository word_sdRepository;


    @Autowired
    private TestThreeRepository testThreeRepository;
    @Autowired
    private LaaRepository laaRepository;


    @Autowired
    private Aural_scoreRespository aural_scoreRespository;
    @Autowired
    private Word_scoreRespository word_scoreRespository;

    @Autowired
    private Record_scoreRespository record_scoreRespository;


    private Map<String, String> map = new HashMap();

    @GetMapping("/downloadReport{email}")
    public void downloadReport(@PathVariable("email") String email, HttpServletResponse response) throws DocumentException {
        System.out.println("开始下载pdf");
        //vl  单词学习
        {
            String a_vl_score = testOneRepository.findScoreByEmail(email);
            String a_vl_fin_num = testOneRepository.findFinishNum();
            List<Integer> a_vl_all_score = testOneRepository.findAllScore();
            int k = 1;//排名
            for (int i = 0; i < a_vl_all_score.size(); i++) {
                if (a_vl_all_score.get(i) > Integer.valueOf(a_vl_score))
                    k++;
            }
            int a_vl_rate = Math.round((float) k / a_vl_all_score.size() * 100);
            map.put("a_vl_total_score", "20");
            map.put("a_vl_user_score", a_vl_score);
            map.put("a_vl_fin_num", a_vl_fin_num);
            map.put("a_vl_rate", String.valueOf(a_vl_rate) + "%");
        }

        {
            String w_vl_score = vlRepository.findScoreByEmail(email);
            String w_vl_fin_num = vlRepository.findFinishNum();
            List<Integer> w_all_score = vlRepository.findAllScore();
            int k = 1;//排名
            for(int i = 0; i < w_all_score.size(); i++){
                if(w_all_score.get(i) > Integer.valueOf(w_vl_score))
                    k++;
            }
            int w_rate = Math.round((float) k / w_all_score.size()*100) ;

            map.put("w_vl_total_score","20");
            map.put("w_vl_user_score",w_vl_score);
            map.put("w_vl_fin_num",w_vl_fin_num);
            map.put("w_vl_rate",String.valueOf(w_rate)+"%");
        }

//        //sd
        {
            //通过email查询数据，sd视听版
            String a_sd_score = auralSdRepository.findScoreByEmail(email);
            String a_sd_fin_num = auralSdRepository.findFinishNum();
            List<Integer> a_sd_all_score = auralSdRepository.findAllScore();
            int k = 1;//排名
            for(int i = 0; i < a_sd_all_score.size(); i++){
                if(a_sd_all_score.get(i) > Integer.valueOf(a_sd_score))
                    k++;
            }
            int a_sd_rate = Math.round((float) k / a_sd_all_score.size()*100) ;
            map.put("a_sd_total_score","30");
            map.put("a_sd_user_score",a_sd_score);
            map.put("a_sd_fin_num",a_sd_fin_num);
            map.put("a_sd_rate",String.valueOf(a_sd_rate)+"%");
        }

        {
            //通过email查询数据，sd文字版
            String w_sd_score = word_sdRepository.findScoreByEmail(email);
            String w_sd_fin_num = word_sdRepository.findFinishNum();
            List<Integer> w_all_score = word_sdRepository.findAllScore();
            int k = 1;//排名
            for(int i = 0; i < w_all_score.size(); i++){
                if(w_all_score.get(i) > Integer.valueOf(w_sd_score))
                    k++;
            }
            int w_rate = Math.round((float) k / w_all_score.size()*100) ;

            map.put("w_sd_total_score","30");
            map.put("w_sd_user_score",w_sd_score);
            map.put("w_sd_fin_num",w_sd_fin_num);
            map.put("w_sd_rate",String.valueOf(w_rate)+"%");
        }

        //wm  工作记忆
//        {
//            //简单跨度，s为simple
//            Aural_score aural_score = aural_scoreRespository.findScoreByEmail(email);
//            map.put("a_wms_total_score","81");//81分是定值
//            map.put("a_wms_user_score",aural_score.getWord_score());
//
//            List all_wm_records = aural_scoreRespository.findAll(); //此处需改为
//            map.put("a_wms_fin_num", String.valueOf(all_wm_records.size()));
//            int k = 1;//排名
//            for(int i = 0; i < all_wm_records.size(); i++){
//                Aural_score aural_score1 = (Aural_score) all_wm_records.get(i);
//                if(Integer.valueOf(aural_score1.getWord_score()) > Integer.valueOf(aural_score.getWord_score()))
//                    k++;
//            }
//            int w_rate = Math.round((float) k / all_wm_records.size()*100) ;
//            map.put("a_wms_rate",String.valueOf(w_rate)+"%");
////
////            //复杂跨度，c为complicate
//            map.put("a_wmc_total_score","74");//74分是定值
//            map.put("a_wmc_user_score",aural_score.getLetter_score());
//            map.put("a_wmc_fin_num",String.valueOf(all_wm_records.size()));
//            k = 1;//排名
//            for(int i = 0; i < all_wm_records.size(); i++){
//                Aural_score aural_score1 = (Aural_score) all_wm_records.get(i);
//                if(Integer.valueOf(aural_score1.getLetter_score()) > Integer.valueOf(aural_score.getLetter_score()))
//                    k++;
//            }
//            int w_c_rate = Math.round((float) k / all_wm_records.size()*100) ;
//            map.put("a_wmc_rate",String.valueOf(w_c_rate)+"%");
//        }
        //Aural_wm_录音版本成绩
        {
            Aural_score aural_score = aural_scoreRespository.findScoreByEmail(email);
            List all_wm_records = aural_scoreRespository.findAll(); //此处需改为

            //简单跨度，s为simple
            String score1 = record_scoreRespository.getFirstScoreByEmail(email);
            map.put("a_wms_total_score","74");//74分是定值
            map.put("a_wms_user_score",score1);


            map.put("a_wms_fin_num", String.valueOf(record_scoreRespository.getFirstEmailNum()));
            map.put("a_wms_rate","");


//            map.put("w_record_total_lscore","81");
//            map.put("w_record_First_score",score1 );

            //复杂跨度，c为complicate
            map.put("a_wmc_total_score","74");//74分是定值
            map.put("a_wmc_user_score",aural_score.getLetter_score());
            map.put("a_wmc_fin_num",String.valueOf(all_wm_records.size()));
            int k = 1;//排名
            for(int i = 0; i < all_wm_records.size(); i++){
                Aural_score aural_score1 = (Aural_score) all_wm_records.get(i);
                if(Integer.valueOf(aural_score1.getLetter_score()) > Integer.valueOf(aural_score.getLetter_score()))
                    k++;
            }
            int w_c_rate = Math.round((float) k / all_wm_records.size()*100) ;
            map.put("a_wmc_rate",String.valueOf(w_c_rate)+"%");

        }

        //Word_wm_录音版本成绩
        {
            Word_score word_score = word_scoreRespository.findScoreByEmail(email);
            List all_wm_records = word_scoreRespository.findAll();
            String score2 = record_scoreRespository.getSecondScoreByEmail(email);
            System.out.println("第二次录音成绩："+score2);

            map.put("w_wms_total_score","74");//74分是定值
            map.put("w_wms_user_score",score2);

            map.put("w_wms_fin_num", String.valueOf(record_scoreRespository.getSecondEmailNum()));
            map.put("w_wms_rate","");

            //复杂跨度，c为complicate
            map.put("w_wmc_total_score","74");//74分是定值
            map.put("w_wmc_user_score",word_score.getLetter_score());
            map.put("w_wmc_fin_num",String.valueOf(all_wm_records.size()));
            int k = 1;//排名
            for(int i = 0; i < all_wm_records.size(); i++){
                Word_score word_score1 = (Word_score) all_wm_records.get(i);
                if(Integer.valueOf(word_score1.getLetter_score()) > Integer.valueOf(word_score.getLetter_score()))
                    k++;
            }
            int w_c_rate = Math.round((float) k / all_wm_records.size()*100) ;
            map.put("w_wmc_rate",String.valueOf(w_c_rate)+"%");
        }

        //laa
        {
            //通过email查询数据，vl视听版
            String a_laa_score = testThreeRepository.findScoreByEmail(email);
            String a_laa_fin_num = testThreeRepository.findFinishNum();
            List<Integer> a_laa_all_score = testThreeRepository.findAllScore();
            int k = 1;//排名
            for(int i = 0; i < a_laa_all_score.size(); i++){
                if(a_laa_all_score.get(i) > Integer.valueOf(a_laa_score))
                    k++;
            }
            int a_laa_rate = Math.round((float) k / a_laa_all_score.size()*100) ;
            map.put("a_laa_total_score","30");
            map.put("a_laa_user_score",a_laa_score);
            map.put("a_laa_fin_num",a_laa_fin_num);
            map.put("a_laa_rate",String.valueOf(a_laa_rate)+"%");
        }
        {
            //通过email查询数据，vl文字版
            String w_laa_score = laaRepository.findScoreByEmail(email);
            String w_laa_fin_num = laaRepository.findFinishNum();
            List<Integer> w_all_score = laaRepository.findAllScore();
            int k = 1;//排名
            for(int i = 0; i < w_all_score.size(); i++){
                if(w_all_score.get(i) > Integer.valueOf(w_laa_score))
                    k++;
            }
            int w_rate = Math.round((float) k / w_all_score.size()*100) ;

            map.put("w_laa_total_score","30");
            map.put("w_laa_user_score",w_laa_score);
            map.put("w_laa_fin_num",w_laa_fin_num);
            map.put("w_laa_rate",String.valueOf(w_rate)+"%");
        }

        PdfUtils pdfUtils=new PdfUtils();
        //Linux:
        String template_path = "/root/data/report/report_template.pdf";
        String file_name = "report_"+email+".pdf";
        String save_path = "/root/data/report/all_report/";

        //Windows:
//        String template_path = "C:\\report_template.pdf";
//        String file_name = "report_"+email+".pdf";
//        String save_path = "C:\\All_report\\";
        System.out.println(file_name);

        pdfUtils.pdfout(template_path,file_name,save_path,map,response);
    }
}
