package com.jansora.pancake.core.payload.valobj;

import com.jansora.pancake.core.auth.Role;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * <Description> <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @date 2022/8/9 PM12:19 <br>
 * @since 1.0 <br>
 */
public class AuthValObj extends BaseValObj {

    private static final Map<Long, AuthValObj> cache = new HashMap<>();

    /**
     * 认证id
     */
    Long authId;


    /**
     * 角色
     */
    Role role;

    public static AuthValObj of(Long authId, String role) {
        if (Objects.nonNull(authId) && authId < 128 && authId > -128) {
            AuthValObj auth = cache.get(authId);
            if (Objects.nonNull(auth)) {
                return auth;
            }
            cache.put(authId, new AuthValObj(authId, role));
        }
        return new AuthValObj(authId, role);
    }

    public AuthValObj() {
        this.authId = -1L;
        this.role = Role.NULL;
    }

    public AuthValObj(Long authId, String role) {
        this.authId = authId;
        this.role = Role.of(role);
    }

    public Long getAuthId() {
        return authId;
    }

    public Role getRole() {
        return role;
    }
}
