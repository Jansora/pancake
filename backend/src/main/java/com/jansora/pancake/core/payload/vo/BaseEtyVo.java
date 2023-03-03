package com.jansora.pancake.core.payload.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jansora.pancake.core.payload.model.BaseDo;

import java.util.Date;

/**
 * <Description> Description for BaseEtyVo <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @transId null
 * @CreateDate 2022/8/1 AM11:59 <br>
 * @since 1.0 <br>
 */
public class BaseEtyVo extends BaseVo {
    /**
     * 唯一标识
     */
    protected Long id;

    @JsonFormat(timezone = "GMT+8", pattern="yyyy-MM-dd HH:mm:ss")
    protected Date createdAt;

    @JsonFormat(timezone = "GMT+8", pattern="yyyy-MM-dd HH:mm:ss")
    protected Date updatedAt;



    public static <T extends BaseEtyVo, S extends BaseDo> void overrideBase(T target, S source) {
        target.setId(source.getId());
        target.setCreatedAt(source.getCreatedAt());
        target.setUpdatedAt(source.getUpdatedAt());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
