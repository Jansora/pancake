package com.jansora.pancake.core.factory.service;

import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.factory.repository.CrudRepositoryFactory;
import com.jansora.pancake.core.payload.req.BaseReq;
import com.jansora.pancake.core.payload.vo.BaseVo;

/**
 * <Description> Description for CrudRepository <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @transId null
 * @CreateDate 2022/7/28 AM09:41 <br>
 * @since 1.0 <br>
 */
public interface CrudServiceFactory<RESPONSE extends BaseVo, REQUEST extends BaseReq> {

    public abstract CrudRepositoryFactory<RESPONSE, REQUEST> crudFactory();

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
