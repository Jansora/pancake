package com.jansora.pancake.provider;

import com.jansora.pancake.domain.repository.UserRepository;
import com.jansora.pancake.domain.repository.persistence.mapper.UserMapper;
import com.jansora.pancake.domain.repository.persistence.model.UserDo;
import com.jansora.pancake.provider.AuthProvider;
import com.jansora.pancake.provider.UserProvider;
import com.jansora.pancake.provider.auth.AuthReq;
import com.jansora.pancake.provider.user.UserReq;
import com.jansora.pancake.provider.user.UserVo;
import com.jansora.pancake.core.auth.Role;
import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.exception.dao.DataConflictException;
import com.jansora.pancake.core.exception.web.InvalidArgumentException;
import com.jansora.pancake.core.utils.AssertUtils;
import org.apache.dubbo.config.annotation.DubboReference;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;

import java.util.Objects;

/**
 * <Description> Description for UserProviderImpl <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @transId null
 * @CreateDate 2021/11/18 18:07:17 <br>
 * @since 1.0 <br>
 */
@DubboService
public class UserProviderImpl implements UserProvider {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @DubboReference
    AuthProvider authProvider;


    /**
     * 创建一个用户
     * 
     * @return Optional<UserDo>
     */
    @Override
    public UserVo register(UserReq req) throws BaseAppException {
        AssertUtils.nonNull(req);
        AssertUtils.strNonNull(req.getUsername());
        AssertUtils.strNonNull(req.getPassword());
        AssertUtils.strNonNull(req.getUsername(), req.getPassword());
        if(!StringUtils.hasLength(req.getUsername()) || req.getUsername().length() < 5) {
            throw new InvalidArgumentException("用户名不能小于5位");
        }

        UserDo cond = new UserDo();
        cond.setUsername(req.getUsername());
        if(Objects.nonNull(userMapper.selectOne(cond))){
            throw new DataConflictException("该用户名已存在， 请重试");
        }

        if (!StringUtils.hasLength(req.getAlias())) {
            req.setAlias(req.getUsername());
        }

        String password = DigestUtils.md5DigestAsHex(req.getPassword().getBytes());
        req.setPassword(password);
        req.setRole(Role.COMMON.role());

        return userRepository.save(req);
    }

    /**
     * 根据条件更新用户
     * 
     * @return 更新后的用户信息
     * @throws InvalidArgumentException i
     */
    @Override
    public UserVo updateUserInfo(UserReq req) throws BaseAppException {
        authProvider.validateToken(new AuthReq(req.getId(), req.getPassword()));
        AssertUtils.nonNull(req, req.getId());
        req.setPassword(null);
        req.setRole(null);

        return userRepository.save(req);
    }


}
