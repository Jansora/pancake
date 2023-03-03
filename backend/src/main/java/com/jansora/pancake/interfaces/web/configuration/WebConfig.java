package com.jansora.pancake.interfaces.web.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

/**
 * <Description> <br>
 *
 * @author Jansora <br>
 * @version 1.0 <br>
 * @CreateDate 2020/11/20 22:39:39  <br>
 * 
 * @since 1.0 <br>
 */
@Configuration("WebConfig")
public class WebConfig extends WebMvcConfigurationSupport {

    @Bean
    public com.jansora.app.mars.configuration.auth.AuthInterceptor AuthInterceptor() {
        return new com.jansora.app.mars.configuration.auth.AuthInterceptor();
    }

    /*
     * 拦截器配置
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册自定义拦截器，添加拦截路径和排除拦截路径

        registry.addInterceptor(AuthInterceptor());
    }

}
