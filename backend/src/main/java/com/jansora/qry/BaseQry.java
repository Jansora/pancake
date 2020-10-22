package com.jansora.qry;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
public class BaseQry implements Serializable {

    protected Long id;

    protected String orderBy;

    protected String sort;

    protected Long limit;

    protected Long offset;
}
