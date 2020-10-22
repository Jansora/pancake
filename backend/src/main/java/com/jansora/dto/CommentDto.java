package com.jansora.dto;

import com.jansora.entity.BaseEntity;
import com.jansora.entity.UserEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;


@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class CommentDto extends BaseEntity {

    private String raw;

    private UserEntity owner;

    private List<CommentDto> children;
}
