package com.jansora.pancake.core.payload.dto;

import java.io.Serializable;

/**
 * <Description> Description for DatetimeDto <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @transId null
 * @CreateDate 2022/3/23 PM12:19 <br>
 * @since 1.0 <br>
 */
public class DatetimeDto extends DateDto implements Serializable {

    Integer hour;

    Integer minute;

    Integer second;

    public Integer getHour() {
        return hour;
    }

    public void setHour(Integer hour) {
        this.hour = hour;
    }

    public Integer getMinute() {
        return minute;
    }

    public void setMinute(Integer minute) {
        this.minute = minute;
    }

    public Integer getSecond() {
        return second;
    }

    public void setSecond(Integer second) {
        this.second = second;
    }


}
