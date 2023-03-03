package com.jansora.pancake.core.exception.dao;

import com.jansora.pancake.core.exception.BaseAppException;

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 * 2020/12/02 15:47:59
 */
public class DataOperationException extends BaseAppException {

    public DataOperationException() {
        super("500", "数据操作异常");
    }
    public DataOperationException(String errorDesc) {
        super("500", errorDesc);
    }
}
