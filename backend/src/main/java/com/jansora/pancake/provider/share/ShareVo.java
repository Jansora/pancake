package com.jansora.pancake.provider.share;

import com.jansora.pancake.core.payload.vo.BaseVo;
import lombok.AllArgsConstructor;

/**
 * @description:
 * @author: jansora (zhang.yangyuan)
 * @date: 2023-03-01 00:47:43
 */
@AllArgsConstructor
public class ShareVo extends BaseVo {

    /**
     * hash
     */
    String hash;

    /**
     * 载荷
     */
    Long sourceId;

    private Character source;


    public ShareVo() {
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public Long getSourceId() {
        return sourceId;
    }

    public void setSourceId(Long sourceId) {
        this.sourceId = sourceId;
    }

    public Character getSource() {
        return source;
    }

    public void setSource(Character source) {
        this.source = source;
    }
}
