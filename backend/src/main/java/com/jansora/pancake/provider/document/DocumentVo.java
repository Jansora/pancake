package com.jansora.pancake.provider.document;

import com.jansora.pancake.core.payload.vo.BaseEtyVo;
import lombok.Data;

import java.io.Serializable;

@Data
public class DocumentVo extends BaseEtyVo implements Serializable {


    private String versionId;


    private String raw;

}
