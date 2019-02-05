package cn.tingyu.mypage.blog.service;

import cn.tingyu.mypage.blog.model.BlogDomain;
import com.github.pagehelper.PageInfo;

public interface BlogService {
    int addBlog(BlogDomain blogDomain);

    PageInfo<BlogDomain> findAllBlog(int pageNum,int pageSize);
}
