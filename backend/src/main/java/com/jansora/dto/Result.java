package com.jansora.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;


@Data
@ToString
@Builder
public class Result implements Serializable {
    private int total;
    private Object data;
//    private List<T> rows;
    private String message;
    private Boolean status = true;
}
