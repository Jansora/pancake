package com.jansora.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;


@Data
@ToString
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class DocEntity extends BaseEntity {

    public enum ORDER_BY {
        raw, owner_id, version,
    }
    public enum Version {
        AUTO_CREATED, NORMAL,
    }

    private String raw;
    private Long ownerId;
    private String version;
}
