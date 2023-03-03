package com.jansora.pancake.interfaces.web.configuration;

import com.jansora.pancake.provider.AuthProvider;
import com.jansora.pancake.provider.auth.AuthReq;
import com.jansora.pancake.provider.user.UserVo;
import com.jansora.pancake.core.auth.Role;
import com.jansora.pancake.core.exception.auth.ForbiddenException;
import com.jansora.pancake.core.exception.auth.UnauthorizedException;
import org.apache.dubbo.config.annotation.DubboReference;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

/**
 * <Description> 权限验证 <br>
 *
 * @author Jansora <br>
 * @version 1.0 <br>
 * @CreateDate 2020/11/20 22:21:29  <br>
 * 
 * @since 4.0 <br>
 */
@Configuration
public class AuthInterceptor implements HandlerInterceptor {


    @DubboReference
    AuthProvider authProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws ForbiddenException, UnauthorizedException {
        formatCurrentUser(request);
        Auth auth =((HandlerMethod) handler).getMethodAnnotation(Auth.class);
        if(Objects.nonNull(auth)) {
            return checkRolePermission(auth.value());
        }
        return true;
    }

    private void formatCurrentUser(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        long authId = -1L;
        String authToken = "";

        if (null != cookies) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    authToken = cookie.getValue();
                }
                if ("id".equals(cookie.getName())) {
                    try {
                        authId = Long.parseLong(cookie.getValue());
                    }
                    catch (NumberFormatException ignored) {

                    }
                }
            }
        }
        try {
            WebAuthContext.setUserContext(authProvider.loginWithToken(new AuthReq(authId, authToken)));
        }
        catch (Exception ignored) {

        }
    }

    // 检查权限
    private boolean checkRolePermission(Role[] roles) throws UnauthorizedException, ForbiddenException {
        if (roles.length == 0) {
            return true;
        }

        UserVo userDo = WebAuthContext.getCurrentUser();
        for (Role role : roles) {
            if (role.role().equals(userDo.getRole())) {
                return true;
            }
        }
        throw new ForbiddenException("没有访问权限");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        WebAuthContext.clear();
    }
}
