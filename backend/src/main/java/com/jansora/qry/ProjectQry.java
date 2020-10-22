package com.jansora.qry;

import lombok.Data;
import lombok.ToString;


@Data
@ToString
public class ProjectQry extends BaseQry {
    private String title;

    private String description;

    private String iframe;

    private Long ownerId;

    private String url;

    private String logo;

    private String permission;

}
