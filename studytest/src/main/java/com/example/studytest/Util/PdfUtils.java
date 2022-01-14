package com.example.studytest.Util;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Map;

public class PdfUtils {
    // 利用模板生成pdf
    public static void pdfout(String templatePath,
                              String fileName,
                              String savePath,
                              Map<String,String> datemap,
                              HttpServletResponse response) {
        try {
            // 模板路径
            //String templatePath = "src/main/resources/report/report_template.pdf";
            // 生成的新文件路径
            //String fileName = "src/main/resources/report/report.pdf";
            //设置ContentType请求信息格式
            response.setContentType("application/pdf");
            response.setHeader("Content-disposition", "attachment;filename=" + fileName);
            // 输出到前端
            OutputStream outputStream = response.getOutputStream();
            //linux
            BaseFont bf = BaseFont.createFont("/root/data/simsunb.ttf" , BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            //            BaseFont bf = BaseFont.createFont("C:\\simsunb.ttf" , BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            Font FontChinese = new Font(bf,5, Font.NORMAL);

            PdfReader reader = new PdfReader(templatePath);// 读取pdf模板
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            PdfStamper stamper = new PdfStamper(reader, bos);
            AcroFields form = stamper.getAcroFields();
            //文字类的内容处理
            form.addSubstitutionFont(bf);
            for(String key : datemap.keySet()){
                String value = datemap.get(key);
                form.setField(key,value);
            }
            stamper.setFormFlattening(true);// 如果为false，生成的PDF文件可以编辑，如果为true，生成的PDF文件不可以编辑
            stamper.close();
            Document doc = new Document();
            Font font = new Font(bf, 32);
            PdfCopy copy = new PdfCopy(doc, outputStream);
            doc.open();
            PdfImportedPage importPage = copy.getImportedPage(new PdfReader(bos.toByteArray()), 1);
            copy.addPage(importPage);

            // 保存在本地
            FileOutputStream fileOutputStream = new FileOutputStream(savePath+fileName);
            fileOutputStream.write(bos.toByteArray());
            fileOutputStream.close();

            doc.close();
        } catch (IOException e) {
            System.out.println(e);
        } catch (DocumentException e) {
            System.out.println(e);
        }
    }

}