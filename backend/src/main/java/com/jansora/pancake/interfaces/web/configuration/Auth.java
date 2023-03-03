package com.jansora.pancake.interfaces.web.configuration;

import com.jansora.pancake.core.auth.Role;

import java.lang.annotation.*;


/**
 * <Description> 认证注解 <br>
 *
 * @author Jansora <br>
 * @version 1.0 <br>
 * @CreateDate  2020/11/20 13:36:19  <br>
 * 
 * @since 1.0 <br>
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.TYPE, ElementType.PARAMETER})
public @interface Auth {


    Role[] value() default Role.ADMIN;

}
