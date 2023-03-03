package com.jansora.pancake.core.payload.mo;

import com.jansora.pancake.core.payload.dto.BaseDto;
import com.jansora.pancake.core.utils.DateUtils;

/**
 * <Description> <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @date 2022/8/16 AM10:18 <br>
 * @since 1.0 <br>
 */
public class BaseMo extends BaseDto {

    private String timestamp;

    public BaseMo() {
        this.timestamp = DateUtils.formatNowTimestamp();
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
