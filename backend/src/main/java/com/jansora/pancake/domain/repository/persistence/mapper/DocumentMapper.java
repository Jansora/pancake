package com.jansora.pancake.domain.repository.persistence.mapper;

import com.jansora.pancake.domain.repository.persistence.model.DocumentDo;
import com.jansora.pancake.provider.document.DocumentVo;
import io.mybatis.mapper.Mapper;

/**
 * <Description> Description for DocumentMapper <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @transId null
 * @CreateDate 2021/11/30 19:00:43 <br>
 * @since 1.0 <br>
 */
public interface DocumentMapper extends Mapper<DocumentDo, Long> {

    String findDraftById(Long id);

    DocumentVo findById(Long id);
}