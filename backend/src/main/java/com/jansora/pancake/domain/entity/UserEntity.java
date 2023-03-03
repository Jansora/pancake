package com.jansora.pancake.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.StringJoiner;

/**
 * <Description> Description for UserEntity <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @transId null
 * @CreateDate 2021/11/18 18:59:29 <br>
 * 
 * @since 1.0 <br>
 */
public class UserEntity implements Serializable {

    /**
     * 主键 id
     */
    private Long id;

    private String username;

    @JsonIgnore
    private String password;

    private String alias;

    private String description;

    private String avatar;

    private String role;



    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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



    @Override
    public String toString() {
        return new StringJoiner(", ", UserEntity.class.getSimpleName() + "[", "]")
                .add("alias='" + alias + "'")
                .add("avatar='" + avatar + "'")
                .add("description='" + description + "'")
                .add("id=" + id)
                .add("username='" + username + "'")
                .toString();
    }
}
