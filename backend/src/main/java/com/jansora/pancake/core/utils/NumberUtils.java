package com.jansora.pancake.core.utils;

import com.jansora.pancake.core.payload.dto.KVDto;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <Description> NumberUtils <br>
 *
 * @author jansora <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @CreateDate 2022/3/20 20:23 <br>
 * @since 1.0 <br>
 */
public class NumberUtils {

    public static List<KVDto<Long>> formatMaxPercent(List<KVDto<Long>> reqs) {
        Long max = reqs.stream().map(KVDto::getValue).max(Long::compareTo).orElse(1L);
        reqs.forEach((req) -> {
            req.setValue(req.getValue() * 100L / max);
        });
        return reqs;
    }

    public static List<KVDto<Long>> sortCountDesc(List<KVDto<Long>> reqs) {
        Long max = reqs.stream().map(KVDto::getValue).max(Long::compareTo).orElse(1L);
        reqs.forEach((req) -> {
            req.setValue(req.getValue() * 100L / max);
        });
        return reqs;
    }

    public static List<KVDto<Long>> buildCounts(List<KVDto<Long>> counts) {
        return counts.stream()
                .map(KVDto::getKey)
                .filter(StringUtils::hasLength)
                .map(name -> name.split(","))
                .flatMap(Arrays::stream)
                .collect(Collectors.groupingBy(p -> p, Collectors.counting()))
                .entrySet().stream().map(mapper -> {
                    KVDto<Long> countDto = new KVDto<>();
                    countDto.setKey(mapper.getKey());
                    countDto.setValue(mapper.getValue());
                    return countDto;
                }).collect(Collectors.toList());
    }
}
