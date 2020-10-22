package com.jansora.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;


@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder


public class TopicCatalogEntity extends BaseEntity {
    public enum ORDER_BY {
        owner_id, description, title, url, readNum, likeNum,
    }
    public enum nodeType {
        doc, folder,
    }
    private Long ownerId;

    private Long docId;

    private Long parentId;

    private String nodeType;

    private String title;
}
