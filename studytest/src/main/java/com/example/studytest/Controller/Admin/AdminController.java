package com.example.studytest.Controller.Admin;

import com.example.studytest.Entity.Admin.Admin;
import com.example.studytest.Entity.User.T_invite;
import com.example.studytest.Repository.Admin.AdminRepository;
import com.example.studytest.Repository.User.T_inviteRepository;
import com.example.studytest.Util.CreateSheetUtil;
import com.example.studytest.Util.PingYinUtil;
import com.example.studytest.Util.RandomUtil;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;


    //管理员登录
    @GetMapping("/login{account}/{pwd}")
    public Map<String,Object> findByCode(@PathVariable String account, @PathVariable String pwd)
    {
        Map<String, Object> map =new HashMap<>();
        //通过账户进行查找
        Admin admin = adminRepository.findByAccount(account);
        //如果账户存在
        if(!ObjectUtils.isEmpty(admin))
        {
            //如果密码也相等
            if(admin.getPwd().equals(pwd))
            {
                map.put("state",true);
                map.put("admin",admin);
                map.put("msg","登录成功！");
            }
            //密码不等
            else{
                map.put("state",false);
                map.put("msg","密码错误！");
            }

        }
        else{
            map.put("state",false);
            map.put("msg","账户错误！");
        }
        return map;

    }

    @Autowired
    private T_inviteRepository t_inviteRepository;

    private List<Object> inviteList;

    @PostMapping("/generateCode")
    public String generateCode(@RequestBody Map<String, Object> map){

        //获取前端传入的具体描述和邀请码数量
        String first = (String)map.get("first");
        String des = (String)map.get("des");
        String desFirstSpell = PingYinUtil.getFirstSpell(des);//将具体描述的首字母提取出来
        Integer num = (Integer)map.get("num");

        //生成固定位数的随机数组，这里固定10位，可修改
        //<String> randomCode = RandomUtil.getDistinctRandom(10,num);

        //生成并存储，效率问题待优化
        inviteList = new ArrayList<Object>();
        try{
            for(int i = 0; i < num; i++){
                T_invite t_invite = new T_invite();
                t_invite.setCode(first+desFirstSpell+Integer.toString(i));
                t_invite.setDes(des);
                t_invite.setSession(first);
                inviteList.add(t_invite);
                t_inviteRepository.save(t_invite);
            }
            return "success";
        }
        catch (Exception e){
            System.out.println(e);
            return "failure";
        }
    }

    @GetMapping("/downloadCode")
    public void downloadCode(HttpServletResponse response){

        String sheetName = "invite_code";
        String[] heads = {"id","code","description","session"};
        XSSFWorkbook xssfWorkbook = CreateSheetUtil.createXSSFWorkbook(sheetName,heads,inviteList);

        //保存文件
        String fileName = "invite_code.xlsx ";
        OutputStream outputStream = null;

        try {
            fileName = URLEncoder.encode(fileName,"UTF-8");
            //设置ContentType请求信息格式
            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-disposition", "attachment;filename=" + fileName);
            outputStream = response.getOutputStream();
            xssfWorkbook.write(outputStream);
            outputStream.flush();
            outputStream.close();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

