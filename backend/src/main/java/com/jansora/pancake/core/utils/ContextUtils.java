package com.jansora.pancake.core.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ContextUtils implements ApplicationContextAware {
    private static final Logger LOGGER = LoggerFactory.getLogger(ContextUtils.class);

    public static ApplicationContext context;

    public static String qryEnv(String key) {
        String result = context.getEnvironment().getProperty(key);
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("ContextUtils.qryEnv: key: " + key + ".  value: " + result);
        }
        return result;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        context = applicationContext;
    }
}
