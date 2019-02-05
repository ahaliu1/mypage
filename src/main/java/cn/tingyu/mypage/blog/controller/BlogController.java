package cn.tingyu.mypage.blog.controller;

import cn.tingyu.mypage.blog.service.BlogService;
import cn.tingyu.mypage.blog.model.BlogDomain;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class BlogController {
    @Autowired
    private BlogService blogService;

//    @ResponseBody
//    @PostMapping("/add")
//    public int addBlog(BlogDomain blog){
//        return blogService.addBlog(blog);
//
//    }


    @RequestMapping(value = "/blogs")
    public Object findAllBlog(Model model) {
//       先写死以后再议吧。。
        PageInfo<BlogDomain> pageInfo = blogService.findAllBlog(1, 100);
        model.addAttribute(pageInfo);


        return "blogs";
    }
}
