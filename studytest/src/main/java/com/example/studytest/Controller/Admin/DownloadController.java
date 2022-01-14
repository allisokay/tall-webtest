package com.example.studytest.Controller.Admin;


import com.csvreader.CsvWriter;
import com.example.studytest.Entity.Admin.TestOneRecordView;
import com.example.studytest.Entity.Test1.TestOneRecord;
import com.example.studytest.Entity.Test2.Aural_sd;
import com.example.studytest.Entity.Test3.TestThreeRecord;
import com.example.studytest.Entity.Test4.Test4_info;
import com.example.studytest.Entity.User.T_user;
import com.example.studytest.Entity.word.laa.Laa;
import com.example.studytest.Entity.word.sd.Word_sd;
import com.example.studytest.Entity.word.vl.Vl;
import com.example.studytest.Entity.word.wm.Wm;
import com.example.studytest.Repository.Admin.TestOneRecordViewRepository;
import com.example.studytest.Repository.Test1.TestOneRepository;
import com.example.studytest.Repository.Test2.Aural_sd_repository;
import com.example.studytest.Repository.Test3.TestThreeRepository;
import com.example.studytest.Repository.Test4.Test4_infoRepository;
import com.example.studytest.Repository.User.T_userRepository;
import com.example.studytest.Repository.word.laa.LaaRepository;
import com.example.studytest.Repository.word.vl.VlRepository;
import com.example.studytest.Repository.word.wm.WmRespository;
import com.example.studytest.Repository.word.word_sd.Word_sdRepository;
import com.example.studytest.Util.CreateSheetUtil;
import com.example.studytest.Util.ObjectToListUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.List;

@RestController
@RequestMapping("/download")
public class DownloadController {
//    @Autowired
////    TestOneRecordViewRepository testOneRecordViewRepository;
//    private TestOneRecordViewRepository testOneRecordViewRepository;


    //    @GetMapping("/downloadTestOneRecord")
//    public void downloadTestOneRecord(HttpServletResponse response) {
//        /*生成excel*/
//        //获取数据
//        List<TestOneRecordView> testOneRecordViews = testOneRecordViewRepository.findAll();
//
//        //创建工作薄
//        XSSFWorkbook xssfWorkbook = new XSSFWorkbook();
//        //创建工作表
//        XSSFSheet sheet = xssfWorkbook.createSheet();
//        xssfWorkbook.setSheetName(0, "测试1记录表");
//        //创建表头
//        XSSFRow head = sheet.createRow(0);
//        String[] heads = {"测试编号", "用户编号", "问题1正确答案", "问题1用户答案", "问题1反应时间", "问题2正确答案", "问题2用户答案", "问题2反应时间", "问题3正确答案", "问题3用户答案", "问题3反应时间", "问题4正确答案", "问题4用户答案", "问题4反应时间", "问题5正确答案", "问题5用户答案", "问题5反应时间", "问题6正确答案", "问题6用户答案", "问题6反应时间", "问题7正确答案", "问题7用户答案", "问题7反应时间", "问题8正确答案", "问题8用户答案", "问题8反应时间", "问题9正确答案", "问题9用户答案", "问题9反应时间", "问题10正确答案", "问题10用户答案", "问题10反应时间", "问题11正确答案", "问题11用户答案", "问题11反应时间", "问题12正确答案", "问题12用户答案", "问题12反应时间", "问题13正确答案", "问题13用户答案", "问题13反应时间", "问题14正确答案", "问题14用户答案", "问题14反应时间", "问题15正确答案", "问题15用户答案", "问题15反应时间", "问题16正确答案", "问题16用户答案", "问题16反应时间", "问题17正确答案", "问题17用户答案", "问题17反应时间", "问题18正确答案", "问题18用户答案", "问题18反应时间", "问题19正确答案", "问题19用户答案", "问题19反应时间", "问题20正确答案", "问题20用户答案", "问题20反应时间", "得分"};
//        for (int i = 0; i < heads.length; i++) {
//            XSSFCell cell = head.createCell(i);
//            cell.setCellValue(heads[i]);
//        }
//        //具体数据写入
//        int cell = 1;
//        for (TestOneRecordView testOneRecordView : testOneRecordViews) {
//            System.out.println(testOneRecordView.toString());
//            Row row = sheet.createRow(cell);//从第二行开始保存数据
//            row.createCell(0).setCellValue(testOneRecordView.getTest1_id());
//            row.createCell(1).setCellValue(testOneRecordView.getUser_id());
//            row.createCell(2).setCellValue(testOneRecordView.getTest1_ques1_corr_ans());
//            row.createCell(3).setCellValue(testOneRecordView.getTest1_ques1_user_ans());
//            row.createCell(4).setCellValue(testOneRecordView.getTest1_ques1_time());
//            cell++;
//        }
//
//        String fileName = "测试1记录.xlsx";
//        OutputStream outputStream = null;
//
//        try {
//            fileName = URLEncoder.encode(fileName, "UTF-8");
//            //设置ContentType请求信息格式
//            response.setContentType("application/vnd.ms-excel");
//            response.setHeader("Content-disposition", "attachment;filename=" + fileName);
//            outputStream = response.getOutputStream();
//            xssfWorkbook.write(outputStream);
//            outputStream.flush();
//            outputStream.close();
//        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
    @Autowired
    private TestOneRepository testOneRepository;
    @Autowired
    private VlRepository vlRepository;

    @Autowired
    private Aural_sd_repository auralSdRepository;
    @Autowired
    private Word_sdRepository wordSdRepository;

    @Autowired
    private Test4_infoRepository test4InfoRepository;
    @Autowired
    private WmRespository wmRespository;

    @Autowired
    private TestThreeRepository testThreeRepository;
    @Autowired
    private LaaRepository laaRepository;

    @Autowired
    private T_userRepository tUserRepository;
    @GetMapping("/downloadData/{testName}/{year}/{month}/{day}")
    public void downloadData(@PathVariable("testName") String testName,
                             @PathVariable("year") String year,
                             @PathVariable("month") String month,
                             @PathVariable("day") String day,
                             HttpServletResponse response) throws IOException {
        String date = year + "/" + month + "/" + day;
        String fileName = "data.csv";
        String[] heads;
        File csv_data = new File(fileName);
        switch (testName) {
            case "aural_vl":
                List<TestOneRecord> testOneRecords = testOneRepository.findByDate(date);
                heads = ObjectToListUtil.getFieldsName(testOneRecords.get(0));
                csv_data = CreateSheetUtil.createCsv(fileName, heads, testOneRecords);
                break;
            case "written_vl":
                List<Vl> vls = vlRepository.findByDate(date);
                heads = ObjectToListUtil.getFieldsName(vls.get(0));
                csv_data = CreateSheetUtil.createCsv(fileName, heads, vls);
                break;
            case "aural_sd":
                List<Aural_sd> auralSds = auralSdRepository.findByDate(date);
                heads = ObjectToListUtil.getFieldsName(auralSds.get(0));
                csv_data = CreateSheetUtil.createCsv(fileName, heads, auralSds);
                break;
            case "written_sd":
                List<Word_sd> wordSds = wordSdRepository.findByDate(date);
                heads = ObjectToListUtil.getFieldsName(wordSds.get(0));
                csv_data = CreateSheetUtil.createCsv(fileName, heads, wordSds);
                break;
            case "aural_wm":
                List<Test4_info> test4Infos = test4InfoRepository.findByDate(date);
                heads = ObjectToListUtil.getFieldsName(test4Infos.get(0));
                csv_data = CreateSheetUtil.createCsv(fileName, heads, test4Infos);
                break;
            case "written_wm":
                List<Wm> wms = wmRespository.findByDate(date);
                heads = ObjectToListUtil.getFieldsName(wms.get(0));
                csv_data = CreateSheetUtil.createCsv(fileName, heads, wms);
                break;
            case "aural_laa":
                List<TestThreeRecord> testThreeRecords = testThreeRepository.findByDate(date);
                heads = ObjectToListUtil.getFieldsName(testThreeRecords.get(0));
                csv_data = CreateSheetUtil.createCsv(fileName, heads, testThreeRecords);
                break;
            case "written_laa":
                List<Laa> laas = laaRepository.findByDate(date);
                heads = ObjectToListUtil.getFieldsName(laas.get(0));
                csv_data = CreateSheetUtil.createCsv(fileName, heads, laas);
                break;
            default:
                List<T_user> tUsers = tUserRepository.findAll();
                heads = ObjectToListUtil.getFieldsName(tUsers.get(0));
                csv_data = CreateSheetUtil.createCsv(fileName, heads, tUsers);
        }


        response.setContentType("application/csv; charset=utf-8");
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
        InputStream in = new FileInputStream(csv_data);
        OutputStream out = response.getOutputStream();
        byte[] bs = {(byte) 0xEF, (byte) 0xBB, (byte) 0xBF};   //new added
        out.write(bs);
        int len;
        byte[] buffer = new byte[1024];
        while ((len = in.read(buffer)) > 0) {
            out.write(buffer, 0, len);
        }

    }
}
