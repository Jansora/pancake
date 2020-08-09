package com.jansora.controller;

import com.jansora.entity.UserEntity;
import com.jansora.qry.UserQry;
import com.jansora.service.CommentService;
import com.jansora.service.UserService;
import com.jansora.utils.ConstantsUtils;
import com.jansora.utils.OssUtils;
import com.jansora.utils.ResultUtils;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BaseController extends ResultUtils {

    @Autowired
    protected UserService userService;

    @Autowired
    protected CommentService commentService;

    @Autowired
    protected HttpServletRequest request;

    @Resource
    protected HttpServletResponse response;

    OssUtils fileUtils = new OssUtils();
    //根据 cookie 获取当前用户信息
    protected UserEntity findUserFromCookie() {
        Cookie[] cookies = request.getCookies();
        String username = "";
        String password = "";
        if (null != cookies) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    password = cookie.getValue();
                }
                if ("username".equals(cookie.getName())) {
                    username = cookie.getValue();
                }
            }
        }
        UserQry userQry = new UserQry();
        userQry.setUsername(username);
        userQry.setPassword(password);
        return (UserEntity) userService.login(userQry).getData();
    }

    //根据 cookie 获取当前用户信息
    protected UserEntity findAdminUserFromCookie() {
        UserEntity user = findUserFromCookie();
        return null != user && ConstantsUtils.USER_ROLE_ADMIN.equals(user.getRole()) ? user : null;

    }

    protected  boolean isLogin() {
        return null != findUserFromCookie() ;
    }

    protected void addCookie(String key, String value, int expiry) {
        Cookie cookie = new Cookie(key, value);
//        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(expiry);
        cookie.setPath("/");
        response.addCookie(cookie);
    }
    protected void removeCookie(String key) {
        Cookie cookie = new Cookie(key, null);
        cookie.setMaxAge(0);
//        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);
    }
}
