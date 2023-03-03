package com.jansora.pancake.domain.repository;

import com.jansora.pancake.domain.converter.DocumentConverter;
import com.jansora.pancake.domain.repository.persistence.mapper.DocumentMapper;
import com.jansora.pancake.domain.repository.persistence.mapper.DocumentVersionMapper;
import com.jansora.pancake.domain.repository.persistence.model.DocumentDo;
import com.jansora.pancake.domain.repository.persistence.model.DocumentVersionDo;
import com.jansora.pancake.provider.document.DocumentReq;
import com.jansora.pancake.provider.document.DocumentStatus;
import com.jansora.pancake.provider.document.DocumentVersionReq;
import com.jansora.pancake.provider.document.DocumentVo;
import com.jansora.pancake.core.exception.dao.DataNotFoundException;
import com.jansora.pancake.core.factory.repository.CrudRepositoryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Repository
public class DocumentCrudRepository implements CrudRepositoryFactory<DocumentVo, DocumentReq> {

    @Autowired
    DocumentMapper documentMapper;

    @Autowired
    DocumentVersionMapper documentVersionMapper;


    @Autowired
    DocumentConverter converter;

    /**
     * 根据主键查找
     * 
     * @return 返回值
     */
    @Override
    public DocumentVo findById(Long id) throws DataNotFoundException {
        return Optional.ofNullable(documentMapper.findById(id)).orElseThrow(DataNotFoundException::new);
    }

    /**
     * 根据主键查找
     * 
     * @return 返回值
     */
    public String findDraftById(Long id) throws DataNotFoundException {
        // 查询文档信息
        return documentMapper.findDraftById(id);
    }

    /**
     * 保存实体
     * 有实体主键则更新， 没有则保存
     * 
     * @return 实体
     */
    @Override
    @Transactional
    public DocumentVo save(DocumentReq req) throws DataNotFoundException {

        DocumentDo document = converter.toDo(req);

        // 保存文档基本信息
        if (Objects.isNull(req.getId())) {
            documentMapper.insert(document);
            req.setId(document.getId());
        }



        DocumentVersionDo version = converter.toVersionDo(req);

        documentVersionMapper.insert(version);

        this.saveVersion(new DocumentVersionReq(document.getId(), req.getRaw(), req.getStatus()));

        if (DocumentStatus.PUBLISH.status().equals(req.getStatus())) {
            documentVersionMapper.cleanDraftDocumentVersionInfosByDocumentId(req.getId());
        }

        return this.findById(document.getId());
    }


    /**
     * @return 返回值
     */
    private void saveVersion(DocumentVersionReq req) {



        return;
    }

    /**
     * 删除实体
     *
     * 
     * @return 被删除的实体
     */
    @Override
    public DocumentVo deleteById(Long id) throws DataNotFoundException {
        DocumentVo record = this.findById(id);
        if (Objects.isNull(record)) {
            throw new DataNotFoundException("该 Document 未找到， 请重试");
        }

        DocumentVersionDo request = new DocumentVersionDo();
        request.setDocumentId(id);

        documentMapper.deleteByPrimaryKey(id);
        documentVersionMapper.delete(request);
        return record;
    }


}
