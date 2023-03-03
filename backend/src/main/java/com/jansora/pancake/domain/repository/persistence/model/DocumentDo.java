package com.jansora.pancake.domain.repository.persistence.model;

import com.jansora.pancake.core.payload.model.BaseDo;
import io.mybatis.provider.Entity;

/**
 * <Description> Description for DocumentDo <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @transId null
 * @CreateDate 2021/11/30 18:50:12 <br>
 * @since 1.0 <br>
 */
@Entity.Table(value = "document", remark = "文档", autoResultMap = true)
public class DocumentDo extends BaseDo {

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
