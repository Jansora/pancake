package com.jansora.pancake.provider;

import com.jansora.pancake.domain.repository.UserRepository;
import com.jansora.pancake.domain.repository.persistence.mapper.UserMapper;
import com.jansora.pancake.domain.repository.persistence.model.UserDo;
import com.jansora.pancake.provider.AuthProvider;
import com.jansora.pancake.provider.auth.AuthReq;
import com.jansora.pancake.provider.user.UserReq;
import com.jansora.pancake.provider.user.UserVo;
import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.exception.auth.UnauthorizedException;
import com.jansora.pancake.core.exception.web.InvalidArgumentException;
import com.jansora.pancake.core.utils.AssertUtils;
import lombok.AllArgsConstructor;
import org.apache.dubbo.config.annotation.DubboService;

/**
 * <Description> Description for AuthProviderImpl <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @transId null
 * @CreateDate 2021/12/1 09:35:56 <br>
 * 
 * @since 1.0 <br>
 */
@DubboService
@AllArgsConstructor
public class AuthProviderImpl implements AuthProvider {

    UserMapper userMapper;

    UserRepository userRepository;

    /**
     * 校验凭证
     *
     * 
     * @return 成功
     */
    @Override
    public void validateToken(AuthReq req) throws InvalidArgumentException, UnauthorizedException {
        AssertUtils.nonNull(req.getAuthId());
        AssertUtils.strNonNull(req.getAuthToken());
        UserDo cond = new UserDo();
        cond.setId(req.getAuthId());
        cond.setPassword(req.getAuthToken());
        if(userMapper.selectCount(cond) == 0){
            throw new UnauthorizedException();
        }
    }

    /**
     * 登录
     * 
     * @return 用户信息
     * @throws InvalidArgumentException 登录失败时抛出异常
     */
    @Override
    public UserVo loginWithToken(AuthReq req) throws BaseAppException {
        this.validateToken(req);
        return userRepository.findById(req.getAuthId());
    }

    /**
     * 登录
     *
     *
     * @return 用户信息
//     * @throws com.jansora.app.repo.core.exception.base.BaseAppException 登录失败时抛出异常
     */
    @Override
    public UserVo loginWithPassword(UserReq req) throws BaseAppException {
        AssertUtils.nonNull(req);
        AssertUtils.strNonNull(req.getUsername(), req.getPassword());

        UserDo cond = new UserDo();
        cond.setUsername(req.getUsername());
        cond.setPassword(req.getPassword());
        UserDo record = userMapper.selectOne(cond).orElseThrow(() -> new InvalidArgumentException("登录失败，请重试"));

        return userRepository.findById(record.getId());
    }

}
