package com.jansora.pancake.domain.repository.persistence.model;

import com.jansora.pancake.core.payload.model.BaseDo;
import io.mybatis.provider.Entity;

/**
 * <Description> Description for DocumentVersionDo <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @transId null
 * @CreateDate 2021/11/30 18:50:29 <br>
 * 
 * @since 1.0 <br>
 */
@Entity.Table(value = "document_version", remark = "文档版本", autoResultMap = true)
public class DocumentVersionDo extends BaseDo {


    /**
     * P: publish 已发布版本
     * D: Draft 草稿版本
     */
    @Entity.Column(value = "status", remark = "装填")
    private Character status;

    /**
     * 关联的文档 id
     */
    @Entity.Column(value = "document_id", remark = "关联的文档")
    private Long documentId;

    /**
     * 文档 raw
     */
    @Entity.Column(value = "raw", remark = "raw")
    private String raw;

    /**
     * 文档 html
     */
    @Entity.Column(value = "html", remark = "html")
    private String html;

    public Character getStatus() {
        return status;
    }

    public void setStatus(Character status) {
        this.status = status;
    }

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

    public String getRaw() {
        return raw;
    }

    public void setRaw(String raw) {
        this.raw = raw;
    }

    public String getHtml() {
        return html;
    }

    public void setHtml(String html) {
        this.html = html;
    }
}
