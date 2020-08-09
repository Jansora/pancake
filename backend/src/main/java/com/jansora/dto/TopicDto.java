package com.jansora.dto;

import com.jansora.entity.TopicEntity;
import com.jansora.entity.UserEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;


@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class TopicDto extends TopicEntity {

    private UserEntity owner;
    private Integer total;

    private Long ownerId;

    private String description;


    private String title;

    private String url;

    private String logo;
    private String permission;
}
