package com.jansora.pancake.provider.auth;

import com.jansora.pancake.core.payload.req.BaseReq;
import lombok.Data;

/**
 * <Description> <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @date 2022/8/9 PM02:15 <br>
 * @since 1.0 <br>
 */
@Data
public class AuthReq extends BaseReq {
    /**
     * 认证id
     */
    Long authId;

    /**
     * 认证 token
     */
    String authToken;

    public AuthReq() {
    }

    public AuthReq(Long authId, String authToken) {
        this.authId = authId;
        this.authToken = authToken;
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }
}
