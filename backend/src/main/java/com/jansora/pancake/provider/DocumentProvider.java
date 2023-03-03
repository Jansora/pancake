package com.jansora.pancake.provider;

import com.jansora.pancake.provider.document.DocumentReq;
import com.jansora.pancake.provider.document.DocumentVersionVo;
import com.jansora.pancake.provider.document.DocumentVo;
import com.jansora.pancake.provider.share.ShareReq;
import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.exception.dao.DataNotFoundException;
import com.jansora.pancake.core.exception.web.InvalidArgumentException;
import com.jansora.pancake.core.factory.provider.CrudProviderFactory;

import java.util.List;

public interface DocumentProvider extends CrudProviderFactory<DocumentVo, DocumentReq> {


    /**
     * 根据主键查找
     * 
     * @return 返回值
     */
    String findEditableRawById(Long documentId) throws DataNotFoundException, InvalidArgumentException;

    /**
     * 根据主键查找
     * 
     * @return 返回值
     */
    String findVersionByVersionId(Long documentVersionId) throws DataNotFoundException, InvalidArgumentException;



    /**
     * 根据文档id 查找历史文档列表
     * 
     * @return 返回值
     */
    List<DocumentVersionVo> findVersionsById(Long documentId) throws DataNotFoundException, InvalidArgumentException;



}
