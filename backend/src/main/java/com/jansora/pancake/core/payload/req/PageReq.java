package com.jansora.pancake.core.payload.req;

import java.io.Serializable;

/**
 * <Description> Description for PageReq <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @transId null
 * @CreateDate 2022/7/28 AM09:36 <br>
 * @since 1.0 <br>
 */
public class PageReq extends BaseReq implements Serializable {
    
    /**
     * 每页大小 <br>
     */
    protected int pageSize;

    /**
     * 当前页数, 从 1 开始 <br>
     */
    protected int pageNum;

    /**
     * 排序方式 ASC / DESC <br>
     */
    protected String sort;

    /**
     * 排序字段 <br>
     */
    protected String orderBy;

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
    }
}
