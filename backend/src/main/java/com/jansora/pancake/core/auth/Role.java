package com.jansora.pancake.core.auth;

public enum Role {
    ADMIN("A", "管理员"),
    COMMON("C", "一般用户"),
    OAUTH("O", "第三方用户"),

    NULL("N", "NULL"),
    ;

    private String role;
    private String description;
    Role(String role, String description) {
        this.role = role;
        this.description = description;
    }


    public static Role of(String role) {
        if (ADMIN.role.equals(role)) {
            return ADMIN;
        }
        if (COMMON.role.equals(role)) {
            return COMMON;
        }
        if (OAUTH.role.equals(role)) {
            return OAUTH;
        }
        return NULL;
    }

    public String role() {
        return role;
    }

    public String description() {
        return description;
    }

}
