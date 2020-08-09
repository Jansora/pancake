package com.jansora.service;

import com.jansora.dao.UserDao;
import com.jansora.dto.Result;
import com.jansora.entity.UserEntity;
import com.jansora.qry.UserQry;
import com.jansora.utils.ConstantsUtils;
import com.jansora.utils.ResultUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class UserService extends ResultUtils {

    @Autowired
    private UserDao userDao;

    public Result query(UserQry userQry) {

        UserEntity user = userDao.findOne(convert(userQry));
        return null != user ? SUCCESSFUL(user) : FAILED("查询失败");

    }

    public Result login(UserQry userQry) {
        if(StringUtils.isEmpty(userQry.getUsername()) || StringUtils.isEmpty(userQry.getPassword()))
            return FAILED("登录失败");

        UserEntity user = userDao.findOne(convert(userQry));
        return null != user ? SUCCESSFUL(user) : FAILED("登录失败");

    }

    public Result register(UserQry userQry) {
        if(StringUtils.isEmpty(userQry.getUsername()) || StringUtils.isEmpty(userQry.getPassword()))
            return FAILED("注册失败");
        UserEntity userEntity = convert(userQry);
        if(null != userDao.findOne(UserEntity.builder().username(userQry.getUsername()).build()))
            return Result.builder().status(false).message("用户名已存在").build();

        if(StringUtils.isEmpty(userQry.getAlias())) userEntity.setAlias(userQry.getUsername());
        userEntity.setAlias(userQry.getUsername());
        userEntity.setRole(userQry.getRole());
//        userEntity.setAvatar("test");

        // 第一个注册的用户视为 admin 用户
        if (0 == userDao.count(UserEntity.builder().build())){
            userEntity.setRole(ConstantsUtils.USER_ROLE_ADMIN);
        } else  {
            userEntity.setRole(ConstantsUtils.USER_ROLE_COMMON);
        }

        userDao.insert(userEntity);
        return SUCCESSFUL(userEntity);
    }

    public Result update(UserQry userQry, UserEntity user) {
        if(null == user || !user.getId().equals(userQry.getId())) return INVALID();
        userDao.update(convert(userQry));
        return SUCCESSFUL(userDao.findOne(UserEntity.builder().id(user.getId()).build()));
    }


    private UserEntity convert(UserQry userQry) {
        UserEntity user = UserEntity.builder().build();
        BeanUtils.copyProperties(userQry, user);
        return user;
    }

}
