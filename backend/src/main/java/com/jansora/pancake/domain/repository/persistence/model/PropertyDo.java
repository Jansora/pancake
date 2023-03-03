package com.jansora.pancake.domain.repository.persistence.model;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.jansora.pancake.core.payload.model.BaseDo;
import io.mybatis.provider.Entity;

import java.util.Date;


@Entity.Table(value = "property", remark = "属性列表", autoResultMap = true)
public class PropertyDo extends BaseDo {

    /**
     * 模块名
     */
    @Entity.Column(value = "module", remark = "模块名")
    private String module;

    /**
     * 启用
     */
    @Entity.Column(value = "enabled", remark = "启用")
    private Boolean enabled;

    /**
     * 序列
     */
    @Entity.Column(value = "seq", remark = "序列")
    private Long seq;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String ak;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String av;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String bk;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String bv;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String ck;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String cv;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String dk;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String dv;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String ek;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String ev;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String fk;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String fv;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String gk;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String gv;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String hk;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Entity.Column
    private String hv;


    private static final long serialVersionUID = 1L;

    @Override
    public String toString() {
        return "PropertyDo{" +
                "id=" + id +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", module='" + module + '\'' +
                ", enabled=" + enabled +
                ", seq=" + seq +
                ", ak='" + ak + '\'' +
                ", av='" + av + '\'' +
                ", bk='" + bk + '\'' +
                ", bv='" + bv + '\'' +
                ", ck='" + ck + '\'' +
                ", cv='" + cv + '\'' +
                ", dk='" + dk + '\'' +
                ", dv='" + dv + '\'' +
                ", ek='" + ek + '\'' +
                ", ev='" + ev + '\'' +
                ", fk='" + fk + '\'' +
                ", fv='" + fv + '\'' +
                ", gk='" + gk + '\'' +
                ", gv='" + gv + '\'' +
                ", hk='" + hk + '\'' +
                ", hv='" + hv + '\'' +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Long getSeq() {
        return seq;
    }

    public void setSeq(Long seq) {
        this.seq = seq;
    }

    public String getAk() {
        return ak;
    }

    public void setAk(String ak) {
        this.ak = ak;
    }

    public String getAv() {
        return av;
    }

    public void setAv(String av) {
        this.av = av;
    }

    public String getBk() {
        return bk;
    }

    public void setBk(String bk) {
        this.bk = bk;
    }

    public String getBv() {
        return bv;
    }

    public void setBv(String bv) {
        this.bv = bv;
    }

    public String getCk() {
        return ck;
    }

    public void setCk(String ck) {
        this.ck = ck;
    }

    public String getCv() {
        return cv;
    }

    public void setCv(String cv) {
        this.cv = cv;
    }

    public String getDk() {
        return dk;
    }

    public void setDk(String dk) {
        this.dk = dk;
    }

    public String getDv() {
        return dv;
    }

    public void setDv(String dv) {
        this.dv = dv;
    }

    public String getEk() {
        return ek;
    }

    public void setEk(String ek) {
        this.ek = ek;
    }

    public String getEv() {
        return ev;
    }

    public void setEv(String ev) {
        this.ev = ev;
    }

    public String getFk() {
        return fk;
    }

    public void setFk(String fk) {
        this.fk = fk;
    }

    public String getFv() {
        return fv;
    }

    public void setFv(String fv) {
        this.fv = fv;
    }

    public String getGk() {
        return gk;
    }

    public void setGk(String gk) {
        this.gk = gk;
    }

    public String getGv() {
        return gv;
    }

    public void setGv(String gv) {
        this.gv = gv;
    }

    public String getHk() {
        return hk;
    }

    public void setHk(String hk) {
        this.hk = hk;
    }

    public String getHv() {
        return hv;
    }

    public void setHv(String hv) {
        this.hv = hv;
    }
}
