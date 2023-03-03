package com.jansora.pancake.provider;

import com.jansora.pancake.provider.property.PropertyReq;
import com.jansora.pancake.core.exception.web.InvalidArgumentException;
import com.jansora.pancake.core.payload.vo.PropertyVo;

import java.util.List;

/**
 * <Description> Description for AuthProvider <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @transId null
 * @CreateDate 2021/12/1 09:35:11 <br>
 * 
 * @since 1.0 <br>
 */
public interface PropertyProvider  {

    /**
     * 校验凭证
     * 
     * @return 成功
     */
    List<PropertyVo> fetchClassifies(PropertyReq req) throws InvalidArgumentException;


}