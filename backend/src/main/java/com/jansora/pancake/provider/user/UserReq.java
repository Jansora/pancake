package com.jansora.pancake.provider.user;

import com.jansora.pancake.core.payload.req.BaseEtyReq;

/**
 * <Description> Description for UserReq <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @transId null
 * @CreateDate 2022/8/2 AM10:45 <br>
 * @since 1.0 <br>
 */
public class UserReq extends BaseEtyReq {

    private String username;

    private String alias;

    private String description;

    private String avatar;

    private String role;

    private String password;

    private boolean keepLogin;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isKeepLogin() {
        return keepLogin;
    }

    public void setKeepLogin(boolean keepLogin) {
        this.keepLogin = keepLogin;
    }
}
