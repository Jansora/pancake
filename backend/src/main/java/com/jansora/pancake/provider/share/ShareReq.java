package com.jansora.pancake.provider.share;

import com.jansora.pancake.core.payload.req.BaseEtyReq;
import lombok.Builder;

/**
 * @description:
 * @author: jansora (zhang.yangyuan)
 * @date: 2023-03-01 00:47:33
 */
@Builder
public class ShareReq extends BaseEtyReq {

    /**
     * 来源
     *
     */
    private Character source;

    /**
     * 来源
     */
    private Long sourceId;


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
