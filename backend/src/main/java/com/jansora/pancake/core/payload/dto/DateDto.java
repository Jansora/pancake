package com.jansora.pancake.core.payload.dto;

import java.io.Serializable;

/**
 * <Description> DateVo <br>
 *
 * @author jansora <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @CreateDate 2022/3/22 18:41 <br>
 * @since 1.0 <br>
 */
public class DateDto implements Serializable {

    Integer year;

    Integer month;

    Integer day;

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
        this.day = day;
    }
}
