package com.jansora.pancake.domain.repository.persistence.model;

import com.jansora.repo.core.payload.model.SearchDo;
import io.mybatis.provider.Entity;

/**
 * <Description> 基本信息 <br>
 *
 * @author zhang.yangyuan (jansora)
 * 2020/12/02 15:39:22
 */

@Entity.Table(value = NoteDo.TABLE_NAME, remark = "系统用户", autoResultMap = true)
public class NoteDo extends SearchDo {

    public static final String TABLE_NAME = "note";

    /**
     * 文档 id
     */
    @Entity.Column(value = "document_id", remark = "文档")

    private Long documentId;


    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

}
