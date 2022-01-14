package com.example.studytest.Util;

import java.util.*;

public class RandomUtil {

    //生成单个指定位数的随机数
    public static String getRandom(int len) {
        int digit = (int) Math.pow(10, len - 1);
        int rs = new Random().nextInt(digit * 10);
        if (rs < digit) {
            rs += digit;
        }
        return String.valueOf(rs);
    }

    //生成长度为len，个数为num的随机数组
    public static List<String> getDistinctRandom(int len, int num) {
        Set<String> s = new HashSet<>();
        while (s.size() < num) {
            s.add(getRandom(len));
        }
        return new ArrayList<>(s);
    }
}
