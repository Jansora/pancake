package com.jansora.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;


@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder

public class Oauth2Entity extends BaseEntity {
    public enum OauthTypes {
        github, weixin, google
    }


    private String oauthId;

    private String userId;

    private OauthTypes oauthType;


}
