package com.jansora.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;


@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder


public class QueryLogoEntity extends BaseEntity {


    private String title;

    private String logo;

    private String source;


}
