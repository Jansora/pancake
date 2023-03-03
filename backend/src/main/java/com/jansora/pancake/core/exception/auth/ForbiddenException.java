package com.jansora.pancake.core.exception.auth;

import com.jansora.pancake.core.exception.BaseAppException;

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 * 2020/12/02 15:47:59
 */
public class ForbiddenException extends BaseAppException {
    public ForbiddenException() {
        super("403", "访问被禁止");
    }
    public ForbiddenException(String errorDesc) {
        super("403", errorDesc);
    }
}
