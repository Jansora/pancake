package com.jansora.pancake.provider.notebook;

import com.jansora.repo.core.payload.req.SearchEtyReq;
import lombok.Data;

import java.util.List;

/**
 * <Description> <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @date 2022/8/9 PM08:19 <br>
 * @since 1.0 <br>
 */
@Data
public class NoteReq extends SearchEtyReq {


    /**
     * hash
     */
    private String hash;

    /**
     * 文档 id
     */
    private String raw;

    /**
     * 标签
     */
    private List<String> tags;

    /**
     * 文档id
     */
    private Long documentId;

}
