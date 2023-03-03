package com.jansora.pancake.interfaces.web.configuration;

import com.jansora.pancake.provider.user.UserVo;
import com.jansora.pancake.core.auth.Role;
import com.jansora.pancake.core.context.AuthContext;
import com.jansora.pancake.core.exception.auth.UnauthorizedException;
import com.jansora.pancake.core.exception.web.InvalidArgumentException;
import com.jansora.pancake.core.payload.valobj.AuthValObj;
import com.jansora.pancake.core.utils.AssertUtils;

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan <br>
 * @version 1.0 <br>
 * @taskId 2259769 <br>
 * @CreateDate 2020/11/28 08:55:24  <br>
 * 
 * @since 1.0 <br>
 */
public class WebAuthContext {



    private static final ThreadLocal<UserVo> userContext = new ThreadLocal<>();

    public static void setUserContext(UserVo user) throws InvalidArgumentException {
        AssertUtils.nonNull(user);
        userContext.set(user);
        AuthContext.setContext(new AuthValObj(user.getId(), user.getRole()));
    }
    public static void clear() {
        userContext.remove();
        AuthContext.clear();
    }
    public static UserVo getCurrentUser() throws UnauthorizedException {
        UserVo userDo = userContext.get();
        try {
            AssertUtils.nonNull(userDo);
        } catch (InvalidArgumentException e) {
            throw new UnauthorizedException();
        }
        return userDo;
    }

    public static UserVo getCurrentUserIgnoreNull() {
        UserVo userDo =  userContext.get();
        if(userDo == null) return new UserVo();
        return userDo;
    }


    public static boolean isAdmin() {
        UserVo user = getCurrentUserIgnoreNull();
        return user.getId() != null && Role.ADMIN.role().equals(user.getRole());
    }

}
