package com.jansora.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;


@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder


public class TopicEntity extends BaseEntity {

    public enum ORDER_BY {
        owner_id, description, title, url, readNum, likeNum,
    }
    public enum PERMISSIONS {
        PRIVATE, PUBLIC
    }
    private Long ownerId;

    private String description;


    private String title;

    private String url;

    private String logo;

    private String permission;

}
