package com.jansora.pancake.domain.repository;

import com.jansora.pancake.domain.converter.ShareConverter;
import com.jansora.pancake.domain.repository.persistence.mapper.ShareMapper;
import com.jansora.pancake.domain.repository.persistence.model.ShareDo;
import com.jansora.pancake.provider.share.ShareReq;
import com.jansora.pancake.provider.share.ShareVo;
import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.exception.dao.DataNotFoundException;
import com.jansora.pancake.core.factory.repository.CrudRepositoryFactory;
import com.jansora.pancake.core.utils.HashUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

/**
 * @description:
 * @author: jansora (zhang.yangyuan)
 * @date: 2023-03-01 00:45:02
 */
@Repository
@AllArgsConstructor
public class ShareCrudRepository implements CrudRepositoryFactory<ShareVo, ShareReq> {


    ShareMapper shareMapper;

    ShareConverter converter;

    /**
     * 可读性
     *
     * @param id 主键
     */
    @Override
    public boolean readable(Long id) throws BaseAppException {
        return true;
    }

    /**
     * 可编辑性
     *
     * @param id id
     */
    @Override
    public boolean editable(Long id) throws BaseAppException {
        return false;
    }

    /**
     * 根据主键查找
     *
     * @param id 主键
     * @return 返回值
     */
    @Override
    public ShareVo findById(Long id) throws BaseAppException {
        return shareMapper.selectByPrimaryKey(id).map(converter::toVo).orElseThrow(() -> new DataNotFoundException("链接已失效"));
    }


    /**
     * 根据主键查找
     */
    public Long findIdByHash(String hash) throws BaseAppException {

        return shareMapper.selectOne(ShareDo.ofHash(hash))
                .map(ShareDo::getId).orElseThrow(() -> new DataNotFoundException("链接已失效"));
    }


    /**
     * 保存实体
     * 有实体主键则更新， 没有则保存
     *
     * @param req req
     * @return 实体
     */
    @Override
    public ShareVo save(ShareReq req) throws BaseAppException {

        ShareDo share = converter.toDo(req);
        share.setHash(HashUtils.hash(String.valueOf(req.getSource() + req.getSourceId()),
                hash -> shareMapper.selectOne(ShareDo.ofHash(hash)).isEmpty()));

        shareMapper.insert(share);
        return this.findById(share.getId());
    }

    /**
     * 删除实体
     *
     * @param id 主键
     * @return 被删除的实体
     */
    @Override
    public ShareVo deleteById(Long id) throws BaseAppException {
        ShareVo record = this.findById(id);
        shareMapper.deleteByPrimaryKey(id);
        return record;
    }
}
