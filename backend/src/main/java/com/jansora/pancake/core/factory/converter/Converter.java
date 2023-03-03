package com.jansora.pancake.core.factory.converter;

import com.jansora.pancake.core.payload.model.BaseDo;
import com.jansora.pancake.core.payload.req.BaseReq;
import com.jansora.pancake.core.payload.vo.BaseVo;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

/**
 * @description:
 * @author: jansora (zhang.yangyuan)
 * @date: 2023-02-28 10:30:54
 */
public interface Converter<REQUEST extends BaseReq, RESPONSE extends BaseVo, MODEL extends BaseDo> {


    /**
     * 入参转化为模型
     */
    @Mappings({
            @Mapping(target = "createdAt", expression = "java(request.getId() != null ? null : new java.util.Date())"),
            @Mapping(target = "updatedAt", expression = "java(new java.util.Date())"),
    })
    MODEL toDo(REQUEST request);

    /**
     * 模型转化为出参
     */
    RESPONSE toVo(MODEL request);


    List<MODEL> toDos(List<REQUEST> requests);

    List<RESPONSE> toVos(List<MODEL> requests);
}
