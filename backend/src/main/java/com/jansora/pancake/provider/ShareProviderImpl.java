package com.jansora.pancake.provider;

import com.jansora.pancake.domain.service.ShareService;
import com.jansora.pancake.provider.ShareProvider;
import com.jansora.pancake.provider.share.ShareReq;
import com.jansora.pancake.provider.share.ShareVo;
import com.jansora.pancake.core.factory.service.CrudServiceFactory;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.beans.factory.annotation.Autowired;

@DubboService
public class ShareProviderImpl implements ShareProvider {

    @Autowired
    ShareService shareService;

    @Override
    public CrudServiceFactory<ShareVo, ShareReq> crudFactory() {
        return shareService;
    }

    @Override
    public ShareVo findByHash(String hash) {
        return shareService.findByHash(hash);
    }
    @Override
    public ShareVo deleteByHash(String hash) {
        return shareService.deleteByHash(hash);
    }

}
