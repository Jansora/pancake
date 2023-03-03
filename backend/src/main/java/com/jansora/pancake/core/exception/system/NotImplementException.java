package com.jansora.pancake.core.exception.system;

import com.jansora.pancake.core.exception.BaseAppException;

/**
 * <Description> <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @date 2022/8/10 AM10:43 <br>
 * @since 1.0 <br>
 */
public class NotImplementException extends BaseAppException {

    public NotImplementException() {
        super("500", "暂未实现");
    }
    public NotImplementException(String errorDesc) {
        super("500", errorDesc);
    }
}