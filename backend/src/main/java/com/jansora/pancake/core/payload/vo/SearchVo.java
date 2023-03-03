package com.jansora.pancake.core.payload.vo;

import com.jansora.pancake.core.payload.model.SearchDo;

/**
 * <Description> Description for SearchVo <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @transId null
 * @CreateDate 2022/8/5 AM11:26 <br>
 * @since 1.0 <br>
 */
public class SearchVo extends BaseEtyVo {

    /**
     * 名称
     */
    protected String name;

    /**
     * 是否启用
     */
    protected Boolean enabled;

    /**
     * 分类
     */
    protected String classify;

    /**
     * 标签
     */
    protected String tag;

    /**
     * 标签
     */
    protected String description;

    /**
     * logo
     */
    protected String logo;

    /**
     * 标签
     */
    protected Long userId;

    public static <T extends SearchVo, S extends SearchDo> void overrideSearch(T target, S source) {

        overrideBase(target, source);

        // 搜索信息
        target.setName(source.getName());
        target.setUserId(source.getUserId());
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
