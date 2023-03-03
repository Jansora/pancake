package com.jansora.pancake.provider.property;

import com.jansora.pancake.core.payload.req.BaseReq;

import java.io.Serializable;

public class PropertyReq extends BaseReq implements Serializable {

    public PropertyReq() {
    }

    public PropertyReq(String module) {
        this.module = module;
    }

    String module;


    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

}
