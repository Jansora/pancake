package com.jansora.pancake.core.factory.service;

import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.factory.repository.SearchRepositoryFactory;
import com.jansora.pancake.core.payload.dto.KVDto;
import com.jansora.pancake.core.payload.req.SearchReq;
import com.jansora.pancake.core.payload.valobj.AuthValObj;
import com.jansora.pancake.core.payload.vo.PageVo;
import com.jansora.pancake.core.payload.vo.SearchVo;

import java.util.List;

/**
 * <Description> <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @date 2022/8/10 AM10:55 <br>
 * @since 1.0 <br>
 */
public interface SearchServiceFactory {

    public abstract SearchRepositoryFactory searchFactory();

    /**
     * 搜索正文
     */
    default PageVo<SearchVo> search(SearchReq req, AuthValObj auth) throws BaseAppException {
        return searchFactory().search(req, auth);
    }

    /**
     * 搜索 classify
     */
    default List<KVDto<Long>> fetchClassifyCounts(AuthValObj auth) throws BaseAppException {
        return searchFactory().fetchClassifyCounts(auth);
    }

    /**
     * 搜索 tag
     */
    default List<KVDto<Long>> fetchTags(String classify, AuthValObj auth) throws BaseAppException {
        return searchFactory().fetchTags(classify, auth);
    }

    /**
     * 搜索 logo
     */
    default List<KVDto<String>> fetchLogos(AuthValObj auth) throws BaseAppException {
        return searchFactory().fetchLogos(auth);
    }

}
