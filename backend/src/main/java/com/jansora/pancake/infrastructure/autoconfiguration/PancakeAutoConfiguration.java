package com.jansora.pancake.infrastructure.autoconfiguration;

import com.jansora.pancake.core.generator.CustomBeanNameGenerator;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

/**
 * <Description> Description for GalaxyAutoConfiguration <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @transId null
 * @CreateDate 2021/11/19 11:50:48 <br>
 * @since 1.0 <br>
 */
@Configuration
@MapperScan(basePackages = "com.jansora.pancake.**.mapper")
public class PancakeAutoConfiguration {
}
