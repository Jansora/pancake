package com.jansora.pancake.core.utils;

import com.jansora.pancake.core.exception.BaseAppException;
import com.jansora.pancake.core.exception.web.BadRequestException;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 * 2021/01/29 13:34:33
 */

public class HttpUtils {
    private static final Logger LOGGER = LoggerFactory.getLogger(HttpUtils.class);

    private static final RestTemplate restTemplate = new RestTemplate();


    static {
        setConverter(restTemplate);
    }

    public static Map<String, String> getHeaders() {
        Map<String, String> headers = new HashMap<>();
        headers.put("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36");
        return headers;
    }



    private static void setConverter(RestTemplate restTemplate) {
        List<HttpMessageConverter<?>> converterList = restTemplate.getMessageConverters();

        // 重新设置StringHttpMessageConverter字符集为UTF-8，解决中文乱码问题
        HttpMessageConverter<?> converterTarget = null;
        for (HttpMessageConverter<?> item : converterList) {
            if (StringHttpMessageConverter.class == item.getClass()) {
                converterTarget = item;
                break;
            }
        }
        if (null != converterTarget) {
            converterList.remove(converterTarget);
        }
        converterList.add(1, new StringHttpMessageConverter(StandardCharsets.UTF_8));

        // 加入FastJson转换器
        converterList.add(new MappingJackson2HttpMessageConverter());
    }


    public HttpHeaders buildJsonHttpHeaders() {
        // 配置 HEADER CONTENT-TYPE 为 JSON
        HttpHeaders headers = new HttpHeaders();
        MediaType type = MediaType.parseMediaType("application/x-www-form-urlencoded");
        headers.setContentType(type);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());
        return headers;
    }

    public static  <T> T get(String url, Class<T> response) throws BaseAppException {
        return HttpUtils.exchange(url, HttpMethod.GET, null, response);
    }

    public static <T> T post(String url, Object body, Class<T> response) throws BaseAppException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());
        HttpEntity<Object> request = new HttpEntity<>(body, headers);
        return HttpUtils.exchange(url, HttpMethod.POST, request, response);
    }

    public static <T> T postForForm(String url, Object body, Class<T> response) throws BaseAppException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());
        HttpEntity<Object> request = new HttpEntity<>(body, headers);
        return HttpUtils.exchange(url, HttpMethod.POST, request, response);
    }


    public static <T> T put(String url, Object body, Class<T> response) throws BaseAppException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());
        HttpEntity<Object> request = new HttpEntity<>(body, headers);
        return HttpUtils.exchange(url, HttpMethod.PUT, request, response);
    }

    public static <T> T putForForm(String url, Object body, Class<T> response) throws BaseAppException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());
        HttpEntity<Object> request = new HttpEntity<>(body, headers);
        return HttpUtils.exchange(url, HttpMethod.PUT, request, response);
    }

    public static <T> T delete(String url,  Class<T> response) throws BaseAppException {
        return HttpUtils.exchange(url, HttpMethod.DELETE, null, response);
    }

    private static <T> T exchange(String url, HttpMethod method, HttpEntity<?> request, Class<T> response)
            throws BaseAppException {

        try {
            return restTemplate.exchange(url, method, request, response).getBody();
        }

        catch (HttpClientErrorException e) {
            LOGGER.error("HttpUtils EXEC REST ERROR... url:{}, method: {}, request: {}", url, method, request);
            LOGGER.error("HttpUtils EXEC REST ERROR... HttpClientErrorException: ", e);
            throw new BadRequestException(e.getResponseBodyAsString());
        }
        catch (HttpServerErrorException e) {
            LOGGER.error("HttpUtils EXEC REST ERROR... url:{}, method: {}, request: {}", url, method, request);
            LOGGER.error("HttpUtils EXEC REST ERROR... HttpServerErrorException: ", e);
            throw new BadRequestException(e.getResponseBodyAsString());
        }

        catch (Exception e) {
            LOGGER.error("HttpUtils EXEC REST ERROR... url:{}, method: {}, request: {}", url, method, request);
            LOGGER.error("HttpUtils EXEC REST ERROR... exception: ", e);

            throw new BadRequestException(e.getMessage());
        }

    }




    public <T> String execFormPost(String url, HttpMethod method, T body) throws BadRequestException {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());
        HttpEntity<T> request = new HttpEntity<>(body, headers);

        try {

            // HTTP 请求查询， 查询失败会抛出 HttpClientErrorException 异常
            ResponseEntity<String> httpResult = restTemplate.exchange(url,
                    method,
                    request,
                    String.class);

            // 解析结果为 JSON
            return httpResult.getBody();
        }
        catch (Exception e) {
            throw new BadRequestException();
        }
    }




    public static Connection.Response  execRequest(String url, Connection.Method method, String body, Map<String, String> cookies) throws IOException {
        Connection conn = Jsoup.connect(url);
        conn.headers(HttpUtils.getHeaders());
        if (!ObjectUtils.isEmpty(method)) {
            conn.method(method);
        }
        else {
            conn.method(Connection.Method.GET);
        }
        if (!ObjectUtils.isEmpty(cookies)) {
            conn.cookies(cookies);
        }
        if (StringUtils.hasLength(body) && !method.equals(Connection.Method.GET)) {
            conn.requestBody(body);
        }
        conn.timeout(10000);
        return conn.execute();
    }




    public <T> String execRest(String url, HttpMethod method, T body) throws BadRequestException {


        HttpEntity<T> request = new HttpEntity<>(body, buildJsonHttpHeaders());

        try {

            // HTTP 请求查询， 查询失败会抛出 HttpClientErrorException 异常
            ResponseEntity<String> httpResult = restTemplate.exchange(url,
                    method,
                    request,
                    String.class);

            // 解析结果为 JSON
            return httpResult.getBody();
        }
        catch (Exception e) {
            throw new BadRequestException();
        }
    }

}
