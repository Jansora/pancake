package com.jansora.pancake.core.payload.dto;

import com.jansora.pancake.core.utils.JsonUtils;

import java.io.Serializable;

/**
 * <Description> Description for BaseDto <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @transId null
 * @CreateDate 2022/8/1 AM11:58 <br>
 * @since 1.0 <br>
 */
public class BaseDto implements Serializable {

    @Override
    public String toString() {
        return this.getClass().getTypeName() + ":" + JsonUtils.toJsonIgnoreError(this);
    }
}
