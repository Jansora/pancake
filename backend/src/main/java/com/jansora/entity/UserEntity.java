package com.jansora.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.SuperBuilder;


@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder

public class UserEntity extends BaseEntity {


    private String username;

    @JsonIgnore
    private String password;

    private String alias;

    private String description;

    private String avatar;

    private String role;

}
