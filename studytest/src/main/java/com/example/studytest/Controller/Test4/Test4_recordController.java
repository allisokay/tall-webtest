package com.example.studytest.Controller.Test4;


import com.example.studytest.Entity.Test4.Test4_record;
import com.example.studytest.Repository.Test4.Aural_recordRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/test4record")
public class Test4_recordController {


    @Autowired
    private Aural_recordRespository aural_recordRespository;



    //post  传给数据库音频文件 单个
    //@RequestParam("file")
    @PostMapping("/save_record")
    public  String save_record(String email ,String recordType,String date,String session,String type, MultipartFile file) throws IOException {

        if( file==null){
            //空文件是否保留问 question
            System.out.println("空文件");
            return "fail";
        }else {
            System.out.println(email);
            System.out.println(recordType);
            System.out.println(date);
            System.out.println(type);

            byte[] bytes = file.getBytes();
//            System.out.println(bytes);
            aural_recordRespository.save(new Test4_record(email,recordType,bytes,date,session,type));
            return "success";
        }

    }
    //post  传给数据库音频文件 单个
    @PostMapping("/save_recordtest")
    public  String save_records(@RequestBody Test4_record test4_record) throws IOException {

        if( test4_record==null){
            return "fail";
        }else {
            System.out.println(test4_record);
//            byte[] bytes = file.getBytes();
//            System.out.println(bytes);
//            aural_recordRespository.save(new Test4_record(22,bytes));
            return "success";
        }

    }


    //post  传给数据库音频文件 数组
    @PostMapping("/save_records")
    public String save_records(@RequestBody List<Test4_record> test4_records){
        int flag = 0;
        //List<Test4_info> Test4_infos ;
        if(test4_records  == null){
            System.out.println("接受到的录音数组为空");
            return "fail";
        }
        for (Test4_record test4_record:test4_records) {



//            if ( =="success"){
//                flag = 1;
//            }
        }
        if(flag == 1){
            return "success";
        }else {
            return "fail";
        }
    }

    //get   传给前端音频文件
    @GetMapping("/send_record/{email}/{src}/{year}/{month}/{day}/{id}")
    public byte[] send_record(@PathVariable("email") String email,@PathVariable("src") String src,@PathVariable("year") String year,
                              @PathVariable("month") String month,
                              @PathVariable("day") String day,
                              @PathVariable("id") Integer id){
        String date = year + "/" + month + "/" + day;
       // Test4_record result = aural_recordRespository.findByEmailAndRecordTypeAndDateAndidIs(email,src,date,id);
        Test4_record result = aural_recordRespository.findByidIs(id);
        System.out.println(id);
        return result.getMp3();
    }

    //get   传给前端音频文件
    @GetMapping("/send_record/{id}")
    public byte[] send_record(@PathVariable("id") Integer id){
        // Test4_record result = aural_recordRespository.findByEmailAndRecordTypeAndDateAndidIs(email,src,date,id);
        Test4_record result = aural_recordRespository.findByidIs(id);
        System.out.println(id);
        return result.getMp3();
    }

    //get    按照日期下载文件
    @GetMapping("/send_records/{year}/{month}/{day}/{type}")
    public List<Test4_record> send_records(@PathVariable("year") String year,
                                           @PathVariable("month") String month,
                                           @PathVariable("day") String day,
                                           @PathVariable("type") String type){
        String date = year + "/" + month + "/" + day;
        //List<Test4_record> results =  aural_recordRespository.findAllByDateIs(date);
        List<Test4_record> results =  aural_recordRespository.findAllByDateAndTypeIs(date,type);
        if(results.isEmpty()){
            System.out.println(" results are null");
        }
        //System.out.println(results);

        return results;
    }



    //get   传给前端用户信息测试过的类型
    @GetMapping("/send_recordInfo/{email}")
    public String send_recordInfo(@PathVariable("email") String email){


        List<Test4_record> test4_records =  aural_recordRespository.findByEmailIs(email);

        if(test4_records.isEmpty()){
            return  "noInfo";
        }else {
            return test4_records.get(0).getRecordType();
        }


    }

    //get   传给前端用户信息测试过的类型
    @GetMapping("/deleteAllByEmailIs/{email}")
    public void deleteAllByEmailIs(@PathVariable("email") String email) {
        aural_recordRespository.deleteAllByEmailIs(email);

    }

}
