package com.jansora.pancake.provider.notebook;

import com.jansora.repo.core.payload.vo.SearchVo;

import java.util.List;

/**
 * <Description> <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @date 2022/8/9 PM08:17 <br>
 * @since 1.0 <br>
 */
public class NoteVo extends SearchVo {

    /**
     * 文档 id
     */
    private String raw;


    /**
     * 标签
     */
    private List<String> tags;

    /**
     * 文档 id
     */
    private Long documentId;

    public String getRaw() {
        return raw;
    }

    public void setRaw(String raw) {
        this.raw = raw;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }

}
