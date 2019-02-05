package cn.tingyu.mypage;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class index {
    @GetMapping("/")
    public String getIndex(HttpServletRequest request, HttpServletResponse response, Model mode) {
        return "home";
    }

    @GetMapping("/home")
    public String getHome(HttpServletRequest request, HttpServletResponse response, Model mode) {
        return "home";
    }

    @GetMapping("/puzzle")
    public String getPuzzle() {
        return "puzzle";
    }

    @GetMapping("/cannon")
    public String getCannon() {
        return "cannon";
    }

    @GetMapping("/chinamap")
    public String getChinaMap() {
        return "footprint";
    }


}
