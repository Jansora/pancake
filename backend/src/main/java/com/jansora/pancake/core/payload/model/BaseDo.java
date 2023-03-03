package com.jansora.pancake.core.payload.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jansora.pancake.core.utils.JsonUtils;
import io.mybatis.provider.Entity;

import java.util.Date;

/**
 * <Description> Description for BaseDo <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @transId null
 * @CreateDate 2022/7/29 PM01:50 <br>
 * @since 1.0 <br>
 */
@Entity.Table(value = "base", remark = "系统用户", autoResultMap = true)
public abstract class BaseDo {

    @Entity.Column(id = true, remark = "主键", updatable = false, insertable = false)
    protected Long id;

    @JsonFormat(timezone = "GMT+8", pattern="yyyy-MM-dd HH:mm:ss")
    @Entity.Column(value = "created_at", remark = "创建时间")
    protected Date createdAt;

    @JsonFormat(timezone = "GMT+8", pattern="yyyy-MM-dd HH:mm:ss")
    @Entity.Column(value = "updated_at", remark = "更新时间")
    protected Date updatedAt;

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


    @Override
    public String toString() {
        return JsonUtils.toJsonIgnoreError(this);
    }
}
