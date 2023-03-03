package com.jansora.pancake.provider;

import com.jansora.pancake.domain.repository.persistence.mapper.PropertyMapper;
import com.jansora.pancake.provider.PropertyProvider;
import com.jansora.pancake.provider.property.PropertyReq;
import com.jansora.pancake.core.exception.web.InvalidArgumentException;
import com.jansora.pancake.core.payload.vo.PropertyVo;
import com.jansora.pancake.core.utils.AssertUtils;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * <Description> Description for AuthProviderImpl <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @transId null
 * @CreateDate 2021/12/1 09:35:56 <br>
 * 
 * @since 1.0 <br>
 */
@DubboService
public class PropertyProviderImpl implements PropertyProvider {

    @Autowired
    PropertyMapper propertyMapper;

    /**
     * fetchClassifies
     *
     * 
     * @return 成功
     */
    @Override
    public List<PropertyVo> fetchClassifies(PropertyReq req) throws InvalidArgumentException {
        AssertUtils.nonNull(req);
        AssertUtils.strNonNull(req.getModule());
        return propertyMapper.findByModule(req);
    }


}
