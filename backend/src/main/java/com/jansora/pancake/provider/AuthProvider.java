package com.jansora.pancake.provider;

import com.jansora.pancake.provider.auth.AuthReq;
import com.jansora.pancake.provider.user.UserReq;
import com.jansora.pancake.provider.user.UserVo;
import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.exception.auth.UnauthorizedException;
import com.jansora.pancake.core.exception.web.InvalidArgumentException;

/**
 * <Description> Description for AuthProvider <br>ø
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @transId null
 * @CreateDate 2021/12/1 09:35:11 <br>
 * 
 * @since 1.0 <br>
 */
public interface AuthProvider {

    /**
     * 校验凭证
     * 
     * @return 成功
     */
    void validateToken(AuthReq req) throws InvalidArgumentException, UnauthorizedException;

    /**
     * 登录
     * 
     * @return 用户信息
     * @throws InvalidArgumentException 登录失败时抛出异常
     */
    UserVo loginWithToken(AuthReq req) throws BaseAppException;

    /**
     * 登录
     *
     * @return 用户信息
     * @throws InvalidArgumentException 登录失败时抛出异常
     */
    UserVo loginWithPassword(UserReq req) throws BaseAppException;


}