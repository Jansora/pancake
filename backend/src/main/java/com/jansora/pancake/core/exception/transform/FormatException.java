package com.jansora.pancake.core.exception.transform;

import com.jansora.pancake.core.exception.BaseAppException;

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 * 2020/12/02 15:47:59
 */
public class FormatException extends BaseAppException {

    public FormatException() {
        super("500", "格式化时出现异常");
    }
    public FormatException(String errorDesc) {
        super("500", errorDesc);
    }
}
