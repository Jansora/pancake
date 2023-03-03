package com.jansora.pancake.provider.document;

/**
 * <Description> Description for DocumentSource <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @transId null
 * @CreateDate 2021/11/30 19:35:41 <br>
 * 
 * @since 1.0 <br>
 */
public enum DocumentSource {

    NOTEBOOK('N');

    final Character source;

    DocumentSource(Character source) {
        this.source = source;
    }

    public Character source() {
        return source;
    }
}