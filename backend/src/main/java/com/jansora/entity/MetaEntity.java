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


public class MetaEntity extends BaseEntity {
    public enum ORDER_BY {
        owner_id, description, title, url, readNum, likeNum,
    }
    public enum PERMISSIONS {
        PRIVATE, PUBLIC
    }
    private Long ownerId;

    private String description;

    private String[] tags;

    @JsonIgnore
    private String tag;

    private String title;

    private String url;

    private String logo;

    private String permission;


    private Long readNum;

    private Long likeNum;

}
