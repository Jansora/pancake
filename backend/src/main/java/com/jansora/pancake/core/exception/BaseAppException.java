package com.jansora.pancake.core.exception;

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 * 2020/12/02 15:47:59
 */
public class BaseAppException extends RuntimeException {

    /*
       errorCode
     */
    protected String errorCode;
    /*
      errorDesc
    */
    protected String errorDesc;

    public BaseAppException(String errorDesc) {
        super(errorDesc);
        this.errorDesc = errorDesc;
    }
    public BaseAppException(String errorCode, String errorDesc) {
        super(errorDesc);
        this.errorCode = errorCode;
        this.errorDesc = errorDesc;
    }

    public String getErrorCode() {
        return this.errorCode;
    }

    public String getErrorDesc() {
        return this.errorDesc;
    }


    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public void setErrorDesc(String errorDesc) {
        this.errorDesc = errorDesc;
    }




}
