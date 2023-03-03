package com.jansora.pancake.core.payload.model;

import io.mybatis.provider.Entity;

/**
 * <Description> Description for SearchDo <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @transId null
 * @CreateDate 2022/8/5 AM11:18 <br>
 * @since 1.0 <br>
 */
@Entity.Table(value = "search", remark = "系统用户", autoResultMap = true)
public class SearchDo extends BaseDo {

    /**
     * 名称
     */
    @Entity.Column(value = "name", remark = "名称")
    protected String name;

    /**
     * 是否启用
     */
    @Entity.Column(value = "enabled", remark = "启用")
    protected Boolean enabled;

    /**
     * 分类
     */
    @Entity.Column(value = "classify", remark = "分类")
    protected String classify;

    /**
     * 标签
     */
    @Entity.Column(value = "tag", remark = "标签")
    protected String tag;

    /**
     * 标签
     */
    @Entity.Column(value = "description", remark = "描述")
    protected String description;

    /**
     * logo
     */
    @Entity.Column(value = "logo", remark = "logo")
    protected String logo;

    /**
     * 标签
     */
    @Entity.Column(value = "user_id", remark = "用户信息")
    protected Long userId;

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
