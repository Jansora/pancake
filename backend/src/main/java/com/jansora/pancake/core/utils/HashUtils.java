package com.jansora.pancake.core.utils;

import com.jansora.pancake.core.exception.dao.DataConflictException;
import com.jansora.pancake.core.exception.system.InitializationException;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Date;
import java.util.function.Predicate;

/**
 * <Description> Description for HashUtils <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @transId null
 * @CreateDate 2021/9/14 19:05:01 <br>
 * @since 1.0 <br>
 */
public class HashUtils {

    private static MessageDigest md = null;

    static {
        try {
            md = MessageDigest.getInstance("MD5");
        }
        catch (Exception e) {
            throw new InitializationException();
        }
    }

    /**
     * 唯一性检测
     */
    public static String hash(String content, Predicate<String> uniquenessDetect) {
        // 反复调用update输入数据:

        content = new Date().getTime() + content;

        for (int i = 0; i < 1000; i++) {
            String hash;

            try {
                md.update(content.getBytes(StandardCharsets.UTF_8));
                hash = new BigInteger(1, md.digest()).toString(16);
            } catch (Exception e) {
                hash = String.valueOf(new Date().getTime());
            }
            if (uniquenessDetect.test(hash)) {
                return hash;
            }
        }

        throw new DataConflictException("Hash 冲突异常剧烈");

    }


}
