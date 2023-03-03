package com.jansora.pancake.provider;

import com.jansora.pancake.domain.service.DocumentService;
import com.jansora.pancake.provider.DocumentProvider;
import com.jansora.pancake.provider.document.DocumentReq;
import com.jansora.pancake.provider.document.DocumentVersionVo;
import com.jansora.pancake.provider.document.DocumentVo;
import com.jansora.pancake.core.exception.dao.DataNotFoundException;
import com.jansora.pancake.core.exception.web.InvalidArgumentException;
import com.jansora.pancake.core.factory.service.CrudServiceFactory;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@DubboService
public class DocumentProviderImpl implements DocumentProvider {

    @Autowired
    DocumentService documentService;

    @Override
    public CrudServiceFactory<DocumentVo, DocumentReq> crudFactory() {
        return documentService;
    }


    /**
     * 根据主键查找
     * 
     * @return 返回值
     */
    @Override
    public String findEditableRawById(Long documentId) throws DataNotFoundException, InvalidArgumentException{
        return documentService.findEditableRawById(documentId);
    }

    /**
     * 根据主键查找
     *
     * 
     * @return 返回值
     */
    @Override
    public String findVersionByVersionId(Long documentVersionId) throws DataNotFoundException, InvalidArgumentException {
        return documentService.findVersionByVersionId(documentVersionId);
    }



    /**
     * 根据文档id 查找历史文档列表
     *
     * 
     * @return 返回值
     */
    @Override
    public List<DocumentVersionVo> findVersionsById(Long documentId) throws DataNotFoundException, InvalidArgumentException {
        return documentService.findVersionsById(documentId);
    }


}
