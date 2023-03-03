package com.jansora.pancake.core.factory.controller;

import com.jansora.pancake.core.auth.Auth;
import com.jansora.pancake.core.auth.Role;
import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.factory.provider.CrudProviderFactory;
import com.jansora.pancake.core.payload.dto.ResultDto;
import com.jansora.pancake.core.payload.req.BaseReq;
import com.jansora.pancake.core.payload.vo.BaseVo;
import org.springframework.web.bind.annotation.*;

/**
 * @description:
 * @author: jansora (zhang.yangyuan)
 * @date: 2023-02-24 12:47:57
 */
public interface CrudControllerFactory<RESPONSE extends BaseVo, REQUEST extends BaseReq> {

    public abstract CrudProviderFactory<RESPONSE, REQUEST> crudFactory();

    /**
     * 查询单条数据
     */
    @GetMapping("{id}")
    default ResultDto<RESPONSE> findById(@PathVariable Long id) throws BaseAppException {
        return ResultDto.SUCCESS(crudFactory().findById(id));
    }

    /**
     * 保存
     */
    @PutMapping
    @Auth({Role.ADMIN})
    default ResultDto<RESPONSE> save(@RequestBody REQUEST req) throws BaseAppException {
        return ResultDto.SUCCESS(crudFactory().save(req));
    }

    /**
     * 删除单条数据
     */
    @DeleteMapping("{id}")
    @Auth({Role.ADMIN})
    default ResultDto<RESPONSE> deleteById(@PathVariable Long id) throws BaseAppException {
        return ResultDto.SUCCESS(crudFactory().deleteById(id));
    }

}
