package com.jansora.dto;

import com.jansora.entity.ProjectEntity;
import com.jansora.entity.UserEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;


@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ProjectDto extends ProjectEntity {

    private UserEntity owner;


}
