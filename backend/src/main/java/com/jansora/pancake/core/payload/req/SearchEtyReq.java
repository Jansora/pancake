package com.jansora.pancake.core.payload.req;

import com.jansora.pancake.core.payload.model.SearchDo;

/**
 * <Description> Description for SearchReq <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @transId null
 * @CreateDate 2022/8/5 AM11:15 <br>
 * @since 1.0 <br>
 */
public class SearchEtyReq extends SearchReq {

    /**
     * 主键信息
     */
    protected Long id;

    /**
     * 是否启用
     */
    protected Boolean enabled;


    /**
     * 标签
     */
    protected String description;

    /**
     * logo
     */
    protected String logo;


    public static <T extends SearchDo, S extends SearchEtyReq> void overrideSearch(T target, S source) {

        // 搜索信息
        target.setName(source.getName());
        target.setClassify(source.getClassify());
        target.setTag(source.getTag());

        // 搜索表信息
        target.setEnabled(source.getEnabled());
        target.setDescription(source.getDescription());
        target.setLogo(source.getLogo());

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public String getClassify() {
        return classify;
    }

    public void setClassify(String classify) {
        this.classify = classify;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
}
