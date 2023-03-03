package com.jansora.pancake.core.factory.provider;

import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.factory.service.CrudServiceFactory;
import com.jansora.pancake.core.payload.req.BaseReq;
import com.jansora.pancake.core.payload.vo.BaseVo;

/**
 * @description:
 * @author: jansora (zhang.yangyuan)
 * @date: 2023-02-26 18:32:08
 */
public interface CrudProviderFactory<RESPONSE extends BaseVo, REQUEST extends BaseReq> {

    public abstract CrudServiceFactory<RESPONSE, REQUEST> crudFactory();


    /**
     * 根据主键查找
     * @param id 主键
     * @return 返回值
     */
    default RESPONSE findById(Long id) throws BaseAppException {
        return crudFactory().findById(id);
    }

    /**
     * 保存实体
     * 有实体主键则更新， 没有则保存
     * @param req req
     * @return 实体
     */
    default RESPONSE save(REQUEST req) throws BaseAppException {
        return crudFactory().save(req);
    }

    /**
     * 删除实体
     * @param id 主键
     * @return 被删除的实体
     */
    default RESPONSE deleteById(Long id) throws BaseAppException {
        return crudFactory().deleteById(id);
    }


}
