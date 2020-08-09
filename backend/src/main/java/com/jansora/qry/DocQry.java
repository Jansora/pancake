package com.jansora.qry;

import lombok.Data;
import lombok.ToString;


@Data
@ToString
public class DocQry extends BaseQry {
    private Long ownerId;

    private String description;

    private String[] tags;

    private String tag;

    private String version;

    private String title;

    private String url;

    private String logo;

    private Long readNum;

    private Long likeNum;

    private String raw;

    private String permission;
}
