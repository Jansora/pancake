package com.jansora.pancake.provider;

import com.jansora.pancake.provider.user.UserReq;
import com.jansora.pancake.provider.user.UserVo;
import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.exception.web.InvalidArgumentException;

public interface UserProvider {

    /**
     * 注册
     * 
     * @return 用户信息
     * @throws InvalidArgumentException 注册失败时抛出异常
     */
    UserVo register(UserReq req) throws BaseAppException;


    UserVo updateUserInfo(UserReq userReq) throws BaseAppException;


}
