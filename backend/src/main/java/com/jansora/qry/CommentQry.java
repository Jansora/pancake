package com.jansora.qry;


import lombok.Data;
import lombok.ToString;

//@EqualsAndHashCode(callSuper = true)
@Data
@ToString
public class CommentQry extends BaseQry {

    private String ownerType;

    private String raw;

    private Long parentId;

}
