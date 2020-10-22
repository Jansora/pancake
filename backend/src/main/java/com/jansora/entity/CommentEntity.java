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

public class CommentEntity extends BaseEntity {

    public enum OwnerType {
        post, feedback, root, topic,
    }

    @JsonIgnore
    private String ownerType;


    private Long userId;


    private Long parentId;

    private String raw;

}
