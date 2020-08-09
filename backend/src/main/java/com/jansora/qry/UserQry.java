package com.jansora.qry;

import lombok.Data;
import lombok.ToString;

//@EqualsAndHashCode(callSuper = true)
@Data
@ToString
public class UserQry extends BaseQry {
    private String username;

    private String password;

    private String keepLogin;

    private String alias;

    private String description;

    private String avatar;

    private String role;
}
