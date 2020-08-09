package com.jansora.dto;

import com.jansora.entity.MetaEntity;
import com.jansora.entity.UserEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;


@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class PostDto extends MetaEntity {

    private String raw;
    private UserEntity owner;
    private Long version;
}
