package com.jansora.pancake.core.factory.repository;

import com.jansora.pancake.core.exception.web.InvalidArgumentException;
import com.jansora.pancake.core.factory.mapper.SearchMapper;
import com.jansora.pancake.core.payload.dto.KVDto;
import com.jansora.pancake.core.payload.req.SearchReq;
import com.jansora.pancake.core.payload.valobj.AuthValObj;
import com.jansora.pancake.core.payload.vo.PageVo;
import com.jansora.pancake.core.payload.vo.SearchVo;
import com.jansora.pancake.core.utils.NumberUtils;

import java.util.List;

/**
 * <Description> <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @date 2022/8/10 AM10:38 <br>
 * @since 1.0 <br>
 */
public interface SearchRepositoryFactory {

    /**
     * 获取表名
     */
    abstract String tableName();

    /**
     * search mapper
     */
    abstract SearchMapper searchMapper();

    /**
     * 搜索正文
     */
    default PageVo<SearchVo> search(SearchReq req, AuthValObj auth) throws InvalidArgumentException {
        PageVo<SearchVo> result = new PageVo<>();
        int pageSize = req.getPageSize();
        int pageNum = req.getPageNum();
        if (req.getPageNum() < 1) {
            throw new InvalidArgumentException("pageNum should be > 0");
        }
        if (req.getPageSize() < 1) {
            throw new InvalidArgumentException("pageSize should be > 0");
        }
        if (req.getPageSize() > 10000) {
            throw new InvalidArgumentException("pageSize should be < 10000");
        }
        req.setPageNum((req.getPageNum() - 1) * req.getPageSize());
        result.setPageSize(pageSize);
        result.setPageNum(pageNum);

        result.setData(searchMapper().search(req, tableName(), auth));
        result.setTotal(searchMapper().searchCount(req, tableName(), auth));
        return result;
    }

    /**
     * 搜索 classify
     */
    default List<KVDto<Long>> fetchClassifyCounts(AuthValObj auth) {
        return searchMapper().fetchClassifyCounts(tableName(), auth);
    }

    /**
     * 搜索 tag
     */
    default List<KVDto<Long>> fetchTags(String classify, AuthValObj auth) {
        return NumberUtils.buildCounts(searchMapper().findTagCounts(tableName(), classify, auth));
    }

    /**
     * 搜索 logo
     */
    default List<KVDto<String>> fetchLogos(AuthValObj auth) {
        return searchMapper().fetchLogos(tableName(), auth);
    }

}
