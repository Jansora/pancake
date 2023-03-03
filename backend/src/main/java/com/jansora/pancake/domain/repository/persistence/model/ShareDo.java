package com.jansora.pancake.domain.repository.persistence.model;

import com.jansora.pancake.core.payload.model.BaseDo;
import io.mybatis.provider.Entity;

/**
 * @description:
 * @author: jansora (zhang.yangyuan)
 * @date: 2023-03-01 00:42:14
 */
@Entity.Table(value = ShareDo.TABLE_NAME, remark = "分享", autoResultMap = true)
public class ShareDo extends BaseDo {



    public static final String TABLE_NAME = "share";

    /**
     * 文档来源
     * N: NoteBook
     */
    @Entity.Column(value = "hash", remark = "哈希")
    private String hash;

    /**
     * 文档来源
     * N: NoteBook
     */
    @Entity.Column(value = "source", remark = "文档来源")
    private Character source;

    /**
     * 文档来源
     */
    @Entity.Column(value = "source_id", remark = "文档来源")
    private Long sourceId;


    public static ShareDo ofHash(String hash) {
        ShareDo shareDo = new ShareDo();
        shareDo.setHash(hash);
        return shareDo;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public Character getSource() {
        return source;
    }

    public void setSource(Character source) {
        this.source = source;
    }

    public Long getSourceId() {
        return sourceId;
    }

    public void setSourceId(Long sourceId) {
        this.sourceId = sourceId;
    }
}
