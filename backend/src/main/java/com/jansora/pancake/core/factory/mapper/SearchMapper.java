package com.jansora.pancake.core.factory.mapper;

import com.jansora.pancake.core.payload.dto.KVDto;
import com.jansora.pancake.core.payload.req.SearchReq;
import com.jansora.pancake.core.payload.valobj.AuthValObj;
import com.jansora.pancake.core.payload.vo.SearchVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <Description> Description for MapperUtils <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @transId null
 * @CreateDate 2022/8/5 PM03:16 <br>
 * @since 1.0 <br>
 */
public interface SearchMapper {

    Long searchCount(@Param("req") SearchReq req, @Param("tableName") String tableName, @Param("auth") AuthValObj auth);

    List<SearchVo> search(@Param("req") SearchReq req, @Param("tableName") String tableName, @Param("auth") AuthValObj auth);

    List<KVDto<Long>> fetchClassifyCounts(@Param("tableName") String tableName, @Param("auth") AuthValObj auth);

    List<KVDto<Long>> findTagCounts(@Param("tableName") String tableName, @Param("classify") String classify, @Param("auth") AuthValObj auth);

    List<KVDto<String>> fetchLogos(@Param("tableName") String tableName, @Param("auth") AuthValObj auth);

}
