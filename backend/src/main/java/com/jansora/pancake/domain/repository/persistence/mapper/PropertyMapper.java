package com.jansora.pancake.domain.repository.persistence.mapper;

import com.jansora.pancake.domain.repository.persistence.model.PropertyDo;
import com.jansora.pancake.provider.property.PropertyReq;
import com.jansora.pancake.core.payload.vo.PropertyVo;
import io.mybatis.mapper.Mapper;

import java.util.List;

public interface PropertyMapper extends Mapper<PropertyDo, Long> {

    List<PropertyVo> findByModule(PropertyReq propertyReq);
}
