package com.jansora.dto;

import com.jansora.entity.BaseEntity;
import com.jansora.entity.MetaEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;


@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class CatalogDto extends BaseEntity {

    private Integer total;

    private Long ownerId;


    private String title;

    private MetaEntity meta;
    private Long docId;

    private Long parentId;

    private String nodeType;

    private List<CatalogDto> children;
}
