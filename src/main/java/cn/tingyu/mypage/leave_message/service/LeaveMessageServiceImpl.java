package cn.tingyu.mypage.leave_message.service;


import cn.tingyu.mypage.leave_message.dao.LeaveMessageDao;
import cn.tingyu.mypage.leave_message.model.LeaveMessage;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service(value = "leaveMessageService")
public class LeaveMessageServiceImpl implements LeaveMessageService {

    @Autowired
    private LeaveMessageDao leaveMessageDao;//这里会报错，但是并不会影响

    @Override
    public int addLeaveMessage(LeaveMessage leaveMessage) {
        return leaveMessageDao.insert(leaveMessage);
    }

    @Override
    public PageInfo<LeaveMessage> findAllLeaveMessage(int pageNum, int pageSize) {
        //将参数传给这个方法就可以实现物理分页了，非常简单。
        PageHelper.startPage(pageNum, pageSize);
        List<LeaveMessage> leaveMessages = leaveMessageDao.selectLeaveMessages();
        PageInfo result = new PageInfo(leaveMessages);
        return result;
    }
}
