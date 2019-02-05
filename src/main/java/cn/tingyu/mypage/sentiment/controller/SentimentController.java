package cn.tingyu.mypage.sentiment.controller;

import cn.tingyu.mypage.leave_message.model.LeaveMessage;
import cn.tingyu.mypage.sentiment.model.Sentiment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;

@Controller
public class SentimentController {

    @GetMapping("/sentiment")
    public String getSentiment(Model model) {

        Sentiment sentiment = new Sentiment();
        model.addAttribute("sentiment", sentiment);

        return "sentiment";
    }

    @GetMapping("/sentiment/analysis")
    @ResponseBody//使得返回的不是html页面
    public String analysis(Model model, HttpServletRequest request) {
        //前端传入的数据
        String input = request.getParameter("input");


        // 接收python脚本的输出结果
        String result=null;
        // 若Python脚本在windows主机中
        String cmdStr_windows = "python G:\\JAVA_project\\liu\\liu\\mypage\\src\\main\\resources\\py\\test.py" + " " + input;

        // 若Python脚本在Linux主机中
        String cmdStr_linux = "python /home/ubuntu/sentiment.py" + " " + input;

        // 定义缓冲区、正常结果输出流、错误信息输出流
        byte[] buffer = new byte[1024];
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        ByteArrayOutputStream outerrStream = new ByteArrayOutputStream();

        try {
            Process proc = Runtime.getRuntime().exec(cmdStr_linux);
            InputStream errStream = proc.getErrorStream();
            InputStream stream = proc.getInputStream();

            // 流读取与写入
            int len = -1;
            while ((len = errStream.read(buffer)) != -1) {
                outerrStream.write(buffer, 0, len);
            }
            while ((len = stream.read(buffer)) != -1) {
                outStream.write(buffer, 0, len);
            }
            proc.waitFor();// 等待命令执行完成

            result=outStream.toString();
            // 打印流信息

        } catch (Exception e) {
            e.printStackTrace();
        }


        return result;
    }


}
