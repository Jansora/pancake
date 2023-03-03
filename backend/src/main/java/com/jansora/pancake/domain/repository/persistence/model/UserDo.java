package com.jansora.pancake.domain.repository.persistence.model;

import com.jansora.pancake.core.payload.model.BaseDo;
import io.mybatis.provider.Entity;

import javax.persistence.Table;


@Table(name = "account")
@Entity.Table(value = "account", remark = "账户", autoResultMap = true)
public class UserDo extends BaseDo {

    public static final String TABLE_NAME = "account";
    /**
     * 用户名
     */
    @Entity.Column(value = "username", remark = "用户名")
    private String username;

    /**
     * 密码
     */
    @Entity.Column(value = "password", remark = "密码")
    private String password;

    /**
     * 别名
     */
    @Entity.Column(value = "alias", remark = "别名")
    private String alias;

    /**
     * 描述
     */
    @Entity.Column(value = "description", remark = "描述")
    private String description;

    /**
     * 头像 url
     */
    @Entity.Column(value = "avatar", remark = "头像")
    private String avatar;

    /**
     * 角色
     */
    @Entity.Column(value = "role", remark = "角色")
    private String role;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    @Override
    public String toString() {
        return super.toString();
    }
}
