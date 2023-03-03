package com.jansora.pancake.core.exception.system;

import com.jansora.pancake.core.exception.BaseAppException;

/**
 * @description:
 * @author: jansora (zhang.yangyuan)
 * @date: 2023-03-01 09:10:56
 */
public class InitializationException extends BaseAppException {
    public InitializationException() {
        super("500", "初始化异常");
    }
    public InitializationException(String errorDesc) {
        super("500", errorDesc);
    }
}