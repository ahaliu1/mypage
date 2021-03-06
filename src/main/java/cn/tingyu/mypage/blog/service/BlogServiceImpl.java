package cn.tingyu.mypage.blog.service;

import cn.tingyu.mypage.blog.dao.BlogDao;
import cn.tingyu.mypage.blog.model.BlogDomain;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service(value = "blogService")
public class BlogServiceImpl implements BlogService {


    @Autowired
    private BlogDao blogDao;//这里会报错但是不影响

    @Override
    public int addBlog(BlogDomain blogDomain) {
        return blogDao.insert(blogDomain);
    }


    /*
     * 这个方法中用到了我们开头配置依赖的分页插件pagehelper
     * 很简单，只需要在service层传入参数，然后将参数传递给一个插件的一个静态方法即可；
     * pageNum 开始页数
     * pageSize 每页显示的数据条数
     * */
    @Override
    public PageInfo<BlogDomain> findAllBlog(int pageNum, int pageSize) {
        //将参数传给这个方法就可以实现物理分页了，非常简单。
        PageHelper.startPage(pageNum, pageSize);
        List<BlogDomain> blogDomains = blogDao.selectBlogs();
        PageInfo result = new PageInfo(blogDomains);
        return result;
    }
}
