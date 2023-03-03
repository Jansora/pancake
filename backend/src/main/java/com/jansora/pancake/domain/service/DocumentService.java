package com.jansora.pancake.domain.service;

import com.jansora.pancake.domain.cache.DocumentCache;
import com.jansora.pancake.domain.repository.DocumentCrudRepository;
import com.jansora.pancake.domain.repository.persistence.mapper.DocumentVersionMapper;
import com.jansora.pancake.domain.repository.persistence.model.DocumentVersionDo;
import com.jansora.pancake.provider.document.DocumentReq;
import com.jansora.pancake.provider.document.DocumentVersionVo;
import com.jansora.pancake.provider.document.DocumentVo;
import com.jansora.pancake.core.exception.dao.DataNotFoundException;
import com.jansora.pancake.core.factory.repository.CrudRepositoryFactory;
import com.jansora.pancake.core.factory.service.CrudServiceFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DocumentService implements CrudServiceFactory<DocumentVo, DocumentReq> {

    @Autowired
    DocumentCrudRepository repository;

    @Autowired
    DocumentCache documentCache;

    @Autowired
    DocumentVersionMapper documentVersionMapper;

    @Override
    public CrudRepositoryFactory<DocumentVo, DocumentReq> crudFactory() {
        return repository;
    }

    /**
     * 根据主键查找
     * 
     * @return 返回值
     */
    public DocumentVo findById(Long id) throws DataNotFoundException {
        return documentCache.findById(id);
    }

    /**
     * 根据主键查找
     * 
     * @return 返回值
     */
    public String findEditableRawById(Long id) throws DataNotFoundException {
        return repository.findDraftById(id);
    }

    /**
     * @return 返回值
     */
    public String findVersionByVersionId(Long documentVersionId) {
         return documentVersionMapper.selectByPrimaryKey(documentVersionId).map(DocumentVersionDo::getRaw).orElse("");
    }



    /**
     * 根据文档id 查找历史文档列表
     *
     * 
     * @return 返回值
     */
    public List<DocumentVersionVo> findVersionsById(Long documentId) {
        return documentVersionMapper.findVersionsById(documentId);
    }

    /**
     * 保存实体
     * 有实体主键则更新， 没有则保存
     * 
     * @return 实体
     */
    @Transactional
    public DocumentVo save(DocumentReq req) throws DataNotFoundException {
        DocumentVo resp = repository.save(req);
        documentCache.cleanById(resp.getId());
        return this.findById(resp.getId());
    }


    /**
     * 删除实体
     *
     * 
     * @return 被删除的实体
     */
    public DocumentVo deleteById(Long id) throws DataNotFoundException {
        documentCache.cleanById(id);
        return repository.deleteById(id);
    }
}
