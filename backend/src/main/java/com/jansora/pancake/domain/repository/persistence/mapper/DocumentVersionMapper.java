package com.jansora.pancake.domain.repository.persistence.mapper;

import com.jansora.pancake.domain.repository.persistence.model.DocumentVersionDo;
import com.jansora.pancake.provider.document.DocumentVersionVo;
import io.mybatis.mapper.Mapper;

import java.util.List;

/**
 * <Description> Description for DocumentVersionMapper <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @transId null
 * @CreateDate 2021/11/30 19:01:00 <br>
 * @since 1.0 <br>
 */
public interface DocumentVersionMapper extends Mapper<DocumentVersionDo, Long> {

    void cleanDraftDocumentVersionInfosByDocumentId(Long documentId);

    List<DocumentVersionVo> findVersionsById(Long documentId);

    DocumentVersionVo findDocumentVersionById(Long documentVersionId);
}
