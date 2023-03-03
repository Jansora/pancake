package com.jansora.pancake.provider.document;

import com.jansora.pancake.core.payload.req.BaseReq;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @description:
 * @author: jansora (zhang.yangyuan)
 * @date: 2023-03-01 00:14:14
 */
@Data
@AllArgsConstructor
public class DocumentVersionReq extends BaseReq {

    public DocumentVersionReq() {
    }

    /**
     * 文档 id
     */
    Long documentId;

    /**
     * 文档 raw
     */
    private String raw;


    /**
     * 文档 raw
     */
    private Character status;

}
