package com.jansora.pancake.provider.document;

/**
 * <Description> Description for DocumentStatus <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @transId null
 * @CreateDate 2021/11/30 19:04:10 <br>
 * 
 * @since 1.0 <br>
 */
public enum DocumentStatus {

    PUBLISH('P'),

    AUTO_CREATED('A');

    final Character status;

    DocumentStatus(Character status) {
        this.status = status;
    }

    public Character status() {
        return status;
    }

}