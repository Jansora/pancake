package com.jansora.pancake.provider.document;

import java.io.Serializable;

/**
 * @description:
 * @author: jansora (zhang.yangyuan)
 * @date: 2022-11-10 17:19:29
 */
public class DocumentVersionVo extends DocumentVo implements Serializable {

    /**
     * 状态
     */
    Character status;

    public Character getStatus() {
        return status;
    }

    public void setStatus(Character status) {
        this.status = status;
    }
}
