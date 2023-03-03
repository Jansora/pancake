package com.jansora.pancake.core.payload.ety;

import com.jansora.pancake.core.payload.dto.BaseDto;

/**
 * <Description> Description for BaseEty <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @transId null
 * @CreateDate 2022/8/2 AM10:35 <br>
 * @since 1.0 <br>
 */
public class BaseEty extends BaseDto {

    /**
     * 唯一标识
     */
    protected Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
