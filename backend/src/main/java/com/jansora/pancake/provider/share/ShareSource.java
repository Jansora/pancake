package com.jansora.pancake.provider.share;

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
public enum ShareSource {

    NOTEBOOK('N'),
    NULL('X'),
    ;

    final Character source;

    ShareSource(Character source) {
        this.source = source;
    }

    public Character source() {
        return source;
    }

    public static ShareSource of(char role) {
        if (NOTEBOOK.source.equals(role)) {
            return NOTEBOOK;
        }
        return NULL;
    }

}