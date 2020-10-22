package com.jansora.qry;

import lombok.Data;
import lombok.ToString;


@Data
@ToString
public class TopicQry extends BaseQry {
    private Long ownerId;

    private String description;


    private String title;

    private String url;

    private String logo;

    private String permission;


}
