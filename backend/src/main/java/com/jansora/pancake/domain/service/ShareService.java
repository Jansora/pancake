package com.jansora.pancake.domain.service;

import com.jansora.pancake.domain.repository.ShareCrudRepository;
import com.jansora.pancake.provider.share.ShareReq;
import com.jansora.pancake.provider.share.ShareVo;
import com.jansora.pancake.core.factory.repository.CrudRepositoryFactory;
import com.jansora.pancake.core.factory.service.CrudServiceFactory;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @description:
 * @author: jansora (zhang.yangyuan)
 * @date: 2023-03-01 09:43:10
 */
@Service
@AllArgsConstructor
public class ShareService implements CrudServiceFactory<ShareVo, ShareReq> {

    ShareCrudRepository repository;

    @Override
    public CrudRepositoryFactory<ShareVo, ShareReq> crudFactory() {
        return repository;
    }

    public ShareVo findByHash(String hash) {
        return this.findById(this.repository.findIdByHash(hash));
    }

    public ShareVo deleteByHash(String hash) {
        return this.deleteById(this.repository.findIdByHash(hash));
    }
}
