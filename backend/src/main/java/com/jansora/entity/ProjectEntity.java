package com.jansora.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder

public class ProjectEntity extends BaseEntity {
    public enum ORDER_BY {
        owner_id, description, title, url, readNum, likeNum,
    }

    public enum PERMISSIONS {
        PRIVATE, PUBLIC
    }
    private String title;

    private String description;

    private String iframe;

    private Long ownerId;

    private String url;

    private String logo;

    private String permission;

}
