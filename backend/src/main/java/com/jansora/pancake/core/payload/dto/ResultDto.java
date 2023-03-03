package com.jansora.pancake.core.payload.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.jansora.pancake.core.exception.BaseAppException;

import java.io.Serializable;
import java.util.Objects;

/**
 * <Description> Description for ResultDto <br>
 *
 * @author jansora (zhang.yangyuan) <br>
 * @version 1.0 <br>
 * @email zhangyue1936@gmail.com
 * @transId null
 * @CreateDate 2022/7/28 AM09:33 <br>
 * @since 1.0 <br>
 */
public class ResultDto<T> implements Serializable {

    public ResultDto() {

    }

    public boolean isStatus() {
        return this.status;
    }

    public T getData() {
        return this.data;
    }

    public String getErrorCode() {
        return this.errorCode;
    }

    public String getErrorDesc() {
        return this.errorDesc;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public void setData(T data) {
        this.data = data;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public void setErrorDesc(String errorDesc) {
        this.errorDesc = errorDesc;
    }

    /*
        default true.
        if error has reached, Assign false and give reason on this.errorCode && this.errorDesc
     */
    private boolean status = true;

    /*
        data should be assigned when status is true;
     */
    @JsonProperty("data")
    private T data = null;

    public enum Status {
        SUCCESS, FAILED
    }

    /*
     errorCode should be assigned when status is false;
     */
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String errorCode;

    /*
     errorDesc  should be assigned when status is false;
     */
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String errorDesc;

    public ResultDto(Status status, T data, String errorCode, String errorDesc, BaseAppException e) {
        this.setStatus(Status.SUCCESS.equals(status));
        this.data = data;
        this.setErrorCode(errorCode);
        this.setErrorDesc(errorDesc);
        if(Objects.nonNull(e)) {
            this.setErrorCode(e.getErrorCode());
            this.setErrorDesc(e.getErrorDesc());
        }
    }
    /**
     * <Description> 成功的构造函数 <br>
     *
     * @author zhang.yangyuan  2020/11/26 18:17:12 <br>
     * @param data 返回数据
     */
    public ResultDto(T data) {
        this(Status.SUCCESS, data, null, null, null);
    }
    /**
     * <Description> 失败 <br>
     *
     * @author zhang.yangyuan  2020/11/26 18:17:12 <br>
     * @param errorCode 错误编码
     * @param errorDesc 错误注释
     */
    public static <T> ResultDto<T> FAIL (String errorCode, String errorDesc) {
        return new ResultDto<>(Status.FAILED, null, errorCode, errorDesc, null);
    }
    /**
     * <Description> 失败 <br>
     *
     * @author zhang.yangyuan  2020/11/26 18:17:12 <br>
     * @param e BaseException
     */
    public ResultDto(BaseAppException e) {
        this.setStatus(false);
        this.setErrorCode(e.getErrorCode());
        this.setErrorDesc(e.getErrorDesc());
    }
    public static <T> ResultDto<T> FAIL (BaseAppException e) {
        return new ResultDto<>(Status.FAILED, null, null, null, e);
    }
    /**
     * <Description> 成功的构造函数 <br>
     *
     * @author zhang.yangyuan  2020/11/26 18:17:12 <br>
     */
    public static <T> ResultDto<T> SUCCESS () {
        return new ResultDto<>(Status.SUCCESS, null, null, null, null);
    }
    /**
     * <Description> 成功的构造函数 <br>
     *
     * @author zhang.yangyuan  2020/11/26 18:17:12 <br>
     */
    public static <T> ResultDto<T> SUCCESS (T data) {
        return new ResultDto<>(Status.SUCCESS, data, null, null, null);
    }


}
