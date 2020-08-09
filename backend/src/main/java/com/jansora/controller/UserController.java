package com.jansora.controller;

import com.jansora.dto.Result;
import com.jansora.entity.UserEntity;
import com.jansora.qry.UserQry;
import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController extends BaseController {

    @GetMapping("queryCurrentUser")
    private Result queryCurrentUser() {
        UserEntity user = findUserFromCookie();
        return Result.builder().status(null != user).data(user).build();
    }
    @GetMapping("queryUser/{id}")
    private Result queryUser(@PathVariable Long id) {
        UserQry userQry = new UserQry();
        userQry.setId(id);
        return userService.query(userQry);
    }

    @PostMapping("register")
    private Result register(UserQry userQry) {
        if(!StringUtils.isEmpty(userQry.getUsername()) && userQry.getUsername().length() < 2) {
            return FAILED("用户名不能小于两位");
        }
        String username = userQry.getUsername();
        String password = DigestUtils.md5DigestAsHex(
                userQry.getPassword().getBytes());
        userQry.setPassword(password);
        Result result = userService.register(userQry);
        if (!result.getStatus()) return result;
        int expiry = 30 * 60 * 60 * 24;
        addCookie("token", password, expiry);
        addCookie("username", username, expiry);

        return result;
    }

    @PostMapping("login")
    private Result login(UserQry userQry) {

        String username = userQry.getUsername();
        String password = DigestUtils.md5DigestAsHex(
                userQry.getPassword().getBytes());
        userQry.setPassword(password);
        Result result = userService.login(userQry);
        if (result.getStatus()) {
            int expiry = "true".equals(userQry.getKeepLogin()) ? 30 * 60 * 60 * 24 : 60 * 60 * 24;
            addCookie("token", password, expiry);
            addCookie("username", username, expiry);
        }

        return result;
    }


    @PostMapping("update")
    private Result update(UserQry userQry) {
        if(!StringUtils.isEmpty(userQry.getPassword())) {
            String password = DigestUtils.md5DigestAsHex(
                    userQry.getPassword().getBytes());
            userQry.setPassword(password);
        }
        if(!StringUtils.isEmpty(userQry.getAlias()) && userQry.getAlias().length() < 2) {
            return FAILED("昵称不能小于两位");
        }
        Result result = userService.update(userQry, findAdminUserFromCookie());

        return result;
    }


    @PostMapping("logout")
    private Result logout() {

        removeCookie("token");
        removeCookie("username");

        return Result.builder().status(true).build();
    }
}
