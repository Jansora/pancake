package com.jansora.pancake.core.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.exception.transform.FormatException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

/**
 * <Description> Description for JsonUtil <br>
 *
 * @author zhang.yangyuan <br>
 * @version 1.0<br>
 * @CreateDate 2021/4/22 18:00:13 <br>
 * @since R9.0<br>
 */
public class JsonUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(JsonUtils.class);

    private static final ObjectMapper instance = new ObjectMapper();

    static {
        instance.enable(SerializationFeature.INDENT_OUTPUT);
        instance.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    /**
     * 对象转 json
     * @param object o
     * @return r
     */
    public static String toJsonIgnoreError(Object object) {
        try {
            return instance.writeValueAsString(object);
        }
        catch (JsonProcessingException e) {
            LOGGER.error("format object to json error", e);
            return "object.getClass() error";
        }

    }

    /**
     * 对象转 json
     * @param object o
     * @return r
     * @throws FormatException e
     */
    public static String toJson(Object object) throws FormatException {
        try {
            return instance.writeValueAsString(object);
        }
        catch (JsonProcessingException e) {
            throw new FormatException();
        }
    }


    /**
     * json字符串转成list
     * @param json String
     * @param <T> <br>
     * @return List
     * @throws BaseAppException <br>
     */
    public static <T> List<T> fromJsonList(String json, Class<?> clazz) throws BaseAppException {
        JavaType javaType = instance.getTypeFactory().constructParametricType(List.class, clazz);
        try {
            return instance.readValue(json, javaType);
        }
        catch (IOException e) {
            throw new FormatException();
        }

    }

    /**
     * json字符串转成对应的对象
     * @param json s
     * @param valueType v
     * @param <T> t
     * @return r
     */
    public static <T> T fromJson(String json, Class<T> valueType) throws FormatException {
        try {
            return instance.readValue(json, valueType);
        }
        catch (IOException e) {
            throw new FormatException();
        }
    }

    /**
     * json字符串转成对应的对象
     * @param json s
     * @return r
     */
    public static JsonNode fromJson(String json) throws FormatException {
        try {
            return instance.readTree(json);
        }
        catch (IOException e) {
            throw new FormatException();
        }
    }

    /**
     * 合并
     * @param lower 低优先级
     * @param higher 高优先级
     * @return r
     */
    public static JsonNode merge(String lower, String higher) {

        try {
            JsonNode lowerNode = null;
            JsonNode higherNode = null;

            if (StringUtils.hasLength(lower)) {
                lowerNode = fromJson(lower, JsonNode.class);
            }
            if (StringUtils.hasLength(higher)) {
                higherNode = fromJson(higher, JsonNode.class);
            }

            if (Objects.nonNull(lowerNode) && Objects.nonNull(higherNode) ) {
                return merge(lowerNode, higherNode);
            }
            if (Objects.nonNull(lowerNode)) {
                return lowerNode;
            }
            if (Objects.nonNull(higherNode)) {
                return higherNode;
            }
        }
        catch (FormatException | JsonProcessingException e) {
            return null;
        }

        return null;

    }

    /**
     * 合并
     * @param lower m
     * @param higher u
     * @return r
     */
    public static JsonNode merge(JsonNode lower, JsonNode higher) throws JsonProcessingException {

//        JsonNode result = new ObjectMapper().readValue("{}", JsonNode.class);
        Iterator<String> fieldNames = higher.fieldNames();

        while (fieldNames.hasNext()) {

            String fieldName = fieldNames.next();
            JsonNode jsonNode = lower.get(fieldName);
            // if field exists and is an embedded object
            if (jsonNode != null && jsonNode.isObject()) {
                ((ObjectNode) lower).set(fieldName, merge(jsonNode, higher.get(fieldName)));
            }
            else {
                if (higher instanceof ObjectNode) {
                    // Overwrite field
                    JsonNode value = higher.get(fieldName);
                    ((ObjectNode) lower).set(fieldName, value);
                }
            }
        }


        return lower;
    }
}
