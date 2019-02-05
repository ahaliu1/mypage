package cn.tingyu.mypage.leave_message.dao;

import cn.tingyu.mypage.leave_message.model.LeaveMessage;

import java.util.List;

public interface LeaveMessageDao {

    int insert(LeaveMessage leaveMessage);
    List<LeaveMessage> selectLeaveMessages();

}
