package com.example.studytest.Util;

import com.csvreader.CsvWriter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.charset.Charset;
import java.util.Iterator;
import java.util.List;

public class CreateSheetUtil {

    /*@author: xiehuan
     * @param: sheetName: 表名
     * @param: heads: 表头
     * @param：dataList: 数据
     * @return：XSSFWorkbook表格
     * */
    public static XSSFWorkbook createXSSFWorkbook(String sheetName,
                                                  String[] heads,
                                                  List<Object> dataList) {

        //创建工作薄
        XSSFWorkbook xssfWorkbook = new XSSFWorkbook();
        //创建工作表
        XSSFSheet sheet = xssfWorkbook.createSheet();
        xssfWorkbook.setSheetName(0, sheetName);
        //创建表头
        XSSFRow head = sheet.createRow(0);
        for (int i = 0; i < heads.length; i++) {
            XSSFCell cell = head.createCell(i);
            cell.setCellValue(heads[i]);
        }

        //具体数据写入
        int cell = 1;
        for (Object item : dataList) {
            Row row = sheet.createRow(cell);//从第二行开始保存数据
            List<Object> val_list = ObjectToListUtil.goThroughObj(item);
            for (int j = 0; j < heads.length; j++) {
                row.createCell(j).setCellValue(String.valueOf(val_list.get(j)));
            }
            cell++;
        }

        return xssfWorkbook;
    }

    public static <T> File createCsv(String csvName,
                                          String[] heads,
                                          List<T> dataList) throws IOException {
        File file = File.createTempFile("data", ".csv");
        CsvWriter csvWriter = new CsvWriter(file.getCanonicalPath(), ',', Charset.forName("UTF-8"));

        //写表头
        csvWriter.writeRecord(heads);

        Iterator<T> iterator = dataList.iterator();
        //具体数据写入
        while (iterator.hasNext()) {
            T next = (T) iterator.next();
            String[] csvContent = ObjectToListUtil.goThroughObjToStr(next);
            csvWriter.writeRecord(csvContent);
        }
        csvWriter.close();
        return file;
    }

}
