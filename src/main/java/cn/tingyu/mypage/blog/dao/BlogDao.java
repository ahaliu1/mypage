package cn.tingyu.mypage.blog.dao;

import cn.tingyu.mypage.blog.model.BlogDomain;

import java.util.List;

public interface BlogDao{
    int insert(BlogDomain blogDomain);

    List<BlogDomain> selectBlogs();
}