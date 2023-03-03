package com.jansora.pancake.provider.document;

import com.jansora.pancake.core.payload.req.BaseEtyReq;

import java.io.Serializable;

public class DocumentReq extends BaseEtyReq implements Serializable {

    /**
     * 文档来源
     * N: NoteBook
     */
    private Character source;

    /**
     * 文档来源
     */
    private Long sourceId;

    /**
     * 当前文档版本id
     */
    private Long versionId;

    /**
     * 文档 raw
     */
    private String raw;



    private Character status;

    public Character getStatus() {
        return status;
    }

    public void setStatus(Character status) {
        this.status = status;
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

    public Long getVersionId() {
        return versionId;
    }

    public void setVersionId(Long versionId) {
        this.versionId = versionId;
    }

    public String getRaw() {
        return raw;
    }

    public void setRaw(String raw) {
        this.raw = raw;
    }


}
