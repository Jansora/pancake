package com.jansora.pancake.core.exception.web;

import com.jansora.pancake.core.exception.BaseAppException;

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 * 2020/12/02 15:47:59
 */
public class BadRequestException extends BaseAppException {

    public BadRequestException() {
        super("400", "请求错误");
    }
    public BadRequestException(String errorDesc) {
        super("400", errorDesc);
    }
}
