package cn.tingyu.mypage.leave_message.service;

import cn.tingyu.mypage.leave_message.model.LeaveMessage;
import com.github.pagehelper.PageInfo;

public interface LeaveMessageService {
    int addLeaveMessage(LeaveMessage leaveMessage);

    PageInfo<LeaveMessage> findAllLeaveMessage(int pageNum,int pageSize);
}
