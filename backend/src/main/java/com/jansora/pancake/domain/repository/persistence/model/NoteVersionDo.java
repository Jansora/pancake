package com.jansora.pancake.domain.repository.persistence.model;

import com.jansora.repo.core.payload.model.BaseDo;
import io.mybatis.provider.Entity;

/**
 * <Description> 正文信息 <br>
 *
 * @author zhang.yangyuan (jansora)
 * 2020/12/02 15:47:59
 */

@Entity.Table(value = NoteVersionDo.TABLE_NAME, remark = "note 版本", autoResultMap = true)
public class NoteVersionDo extends BaseDo {

    public static final String TABLE_NAME = "notebook_note_version";

    @Entity.Column(value = "raw", remark = "名称")
    private String raw;
    @Entity.Column(value = "owner_id", remark = "名称")
    private Long ownerId;
    @Entity.Column(value = "version", remark = "版本")
    private String version;


    public String getRaw() {
        return this.raw;
    }

    public Long getOwnerId() {
        return this.ownerId;
    }

    public String getVersion() {
        return this.version;
    }

    public void setRaw(String raw) {
        this.raw = raw;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public void setVersion(String version) {
        this.version = version;
    }



}
