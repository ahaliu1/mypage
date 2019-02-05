package cn.tingyu.mypage.leave_message.controller;

import cn.tingyu.mypage.leave_message.model.LeaveMessage;
import cn.tingyu.mypage.leave_message.service.LeaveMessageService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.List;


@Controller
public class LeaveMessageController {

    @Autowired
    private LeaveMessageService leaveMessageService;


    @PostMapping("/addmessage")
    public String greetingSubmit(@ModelAttribute LeaveMessage leaveMessage) {
        if (leaveMessage.getName()==""||leaveMessage.getMessage()==""){
            return ("redirect:/leavemessage");
        }
        LeaveMessage message = new LeaveMessage();
        message.setName(leaveMessage.getName());
        message.setMessage(leaveMessage.getMessage());
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        message.setTime(timestamp);

        leaveMessageService.addLeaveMessage(message);
        return ("redirect:/leavemessage");
    }


    @GetMapping("/leavemessage")
    public String getMessages(Model model, HttpServletRequest request) {
        String requestPageNumStr = request.getParameter("requestPageNum");
        PageInfo<LeaveMessage> leaveMessagePageInfo;
        if (requestPageNumStr != null) {
            int requestPageNum = Integer.parseInt(requestPageNumStr);
            leaveMessagePageInfo = findAllLeaveMessages(requestPageNum, 10);

        } else {
            leaveMessagePageInfo = findAllLeaveMessages(1, 10);

        }
        model.addAttribute("pageInfo", leaveMessagePageInfo);


        //添加用户使用
        LeaveMessage leaveMessage = new LeaveMessage();
        model.addAttribute("leavemessage", leaveMessage);

        return "leave_message";
    }

    @GetMapping("/leavemessage/nextpage")
    public String getNextPage(Model model, HttpServletRequest request) {
        String requestPageNumStr = request.getParameter("requestPageNum");

        int requestPageNum = Integer.parseInt(requestPageNumStr);
        PageInfo<LeaveMessage> leaveMessagePageInfo = findAllLeaveMessages(requestPageNum, 10);

        model.addAttribute("pageInfo", leaveMessagePageInfo);


        //添加用户使用
        LeaveMessage leaveMessage = new LeaveMessage();
        model.addAttribute("leavemessage", leaveMessage);

        return "leave_message";
    }


    public PageInfo<LeaveMessage> findAllLeaveMessages(
            @RequestParam(name = "pageNum", required = false, defaultValue = "1")
                    int pageNum,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10")
                    int pageSize) {
        return leaveMessageService.findAllLeaveMessage(pageNum, pageSize);
    }


}
