package com.jansora.qry;

import lombok.Data;
import lombok.ToString;


@Data
@ToString
public class CatalogQry extends DocQry {
    private Long ownerId;

    private Long docId;

    private Long parentId;

    private String nodeType;

    private String resource;
}
