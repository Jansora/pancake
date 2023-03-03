package com.jansora.pancake.core.factory.provider;

import com.jansora.pancake.core.context.AuthContext;
import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.exception.web.InvalidArgumentException;
import com.jansora.pancake.core.factory.service.SearchServiceFactory;
import com.jansora.pancake.core.payload.dto.KVDto;
import com.jansora.pancake.core.payload.req.SearchReq;
import com.jansora.pancake.core.payload.vo.PageVo;
import com.jansora.pancake.core.payload.vo.PropertyVo;
import com.jansora.pancake.core.payload.vo.SearchVo;

import java.util.List;

/**
 * <Description> <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @date 2022/8/10 AM10:58 <br>
 * @since 1.0 <br>
 */
public interface SearchProviderFactory {

    public abstract SearchServiceFactory searchFactory();


    /**
     * 搜索正文
     */
    default PageVo<SearchVo> search(SearchReq req) throws BaseAppException {
        return searchFactory().search(req, AuthContext.auth());
    }

    /**
     * 查询 分类列表
     * @return Optional<EasyCodeDto>
     */
    List<PropertyVo> fetchClassifies() throws InvalidArgumentException;

    /**
     * 搜索 classify
     */
    default List<KVDto<Long>> fetchClassifyCounts() throws BaseAppException {
        return searchFactory().fetchClassifyCounts(AuthContext.auth());
    }

    /**
     * 搜索 tag
     */
    default List<KVDto<Long>> fetchTags(String classify) throws BaseAppException {
        return searchFactory().fetchTags(classify, AuthContext.auth());
    }

    /**
     * 搜索 logo
     */
    default List<KVDto<String>> fetchLogos() throws BaseAppException {
        return searchFactory().fetchLogos(AuthContext.auth());
    }

}
