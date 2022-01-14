package com.example.studytest.Util;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class ObjectToListUtil {

    public static List<Object> goThroughObj(Object obj) {
        Field[] fields = obj.getClass().getDeclaredFields();
        List<Object> list = new ArrayList<>();
        for (int i = 0, len = fields.length; i < len; i++) {
            // 对于每个属性，获取属性名
            String varName = fields[i].getName();
            try {
                // 获取原来的访问控制权限
                boolean accessFlag = fields[i].isAccessible();
                // 修改访问控制权限
                fields[i].setAccessible(true);
                // 获取在对象f中属性fields[i]对应的对象中的变量
                Object o;
                try {
                    o = fields[i].get(obj);
                    list.add(o);
//                    System.err.println("传入的对象中包含一个如下的变量：" + varName + " = " + o);
                } catch (IllegalAccessException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
                // 恢复访问控制权限
                fields[i].setAccessible(accessFlag);
            } catch (IllegalArgumentException ex) {
                ex.printStackTrace();
            }
        }
        return list;
    }

    public static<T> String[] getFieldsName(T obj){
        Field[] fields = obj.getClass().getDeclaredFields();
        String[] ret = new String[fields.length];
        for (int i = 0, len = fields.length; i < len; i++){
            ret[i] = fields[i].getName();
        }
        return ret;
    }
    public static String[] goThroughObjToStr(Object obj) {
        Field[] fields = obj.getClass().getDeclaredFields();
        String[] ret = new String[fields.length];
        for (int i = 0, len = fields.length; i < len; i++) {
            // 对于每个属性，获取属性名
            String varName = fields[i].getName();
            try {
                // 获取原来的访问控制权限
                boolean accessFlag = fields[i].isAccessible();
                // 修改访问控制权限
                fields[i].setAccessible(true);
                // 获取在对象f中属性fields[i]对应的对象中的变量
                String s;
                try {
                    Object value = fields[i].get(obj);
                    if(value==null){
                        continue;
                    }
                    s = value.toString();
                    ret[i] = s;
//                    System.err.println("传入的对象中包含一个如下的变量：" + varName + " = " + o);
                } catch (IllegalAccessException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
                // 恢复访问控制权限
                fields[i].setAccessible(accessFlag);
            } catch (IllegalArgumentException ex) {
                ex.printStackTrace();
            }
        }
        return ret;
    }
}
