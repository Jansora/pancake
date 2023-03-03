package com.jansora.pancake.provider;

import com.jansora.pancake.provider.share.ShareReq;
import com.jansora.pancake.provider.share.ShareVo;
import com.jansora.pancake.core.factory.provider.CrudProviderFactory;

/**
 * @description:
 * @author: jansora (zhang.yangyuan)
 * @date: 2023-02-24 08:57:32
 */
public interface ShareProvider extends CrudProviderFactory<ShareVo, ShareReq> {


    ShareVo findByHash(String hash);


    ShareVo deleteByHash(String hash);

}
