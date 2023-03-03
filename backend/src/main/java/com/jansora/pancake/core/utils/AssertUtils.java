package com.jansora.pancake.core.utils;

import com.jansora.pancake.core.exception.web.InvalidArgumentException;
import org.springframework.util.StringUtils;

import java.util.Collection;
import java.util.Objects;

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan <br>
 * @version 1.0 <br>
 * @CreateDate 2020/11/27 23:28:29  <br>
 * @since 1.0 <br>
 */
public class AssertUtils {

    public static void isFalse(boolean... os) throws InvalidArgumentException {
        for (boolean o : os) {
            if (o) {
                throw new InvalidArgumentException();
            }
        }
    }

    public static void isTrue(boolean... os) throws InvalidArgumentException {
        for (boolean o : os) {
            if (!o) {
                throw new InvalidArgumentException();
            }
        }
    }

    public static void isNull(Object... os) throws InvalidArgumentException {
        for (Object o : os) {
            if (Objects.nonNull(o)) {
                throw new InvalidArgumentException();
            }
        }
    }

    public static void nonNull(Object... os) throws InvalidArgumentException {
        for (Object o : os) {
            if (Objects.isNull(o)) {
                throw new InvalidArgumentException();
            }
        }
    }

    public static void strNonNull(String... os) throws InvalidArgumentException {
        for (String o : os) {
            if (!StringUtils.hasLength(o)) {
                throw new InvalidArgumentException();
            }
        }
    }

    public static void collectionNonNull(Collection<?> collection) throws InvalidArgumentException {
        AssertUtils.nonNull(collection);
        AssertUtils.isTrue(collection.size() > 0);
    }
}
