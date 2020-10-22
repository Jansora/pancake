/*
* @file UploadFile.jsx
* @author jansora
* @date 2020/2/19
*/


import React from "react";
import {message, Upload} from "antd";
import styled from "styled-components";

const UploadWrapper = styled(Upload)`

`
const copyToClipboard = (content='拷贝的内容') => {
    let textArea = document.createElement("textarea");
    textArea.value = content;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    console.log(content)
    try {
        document.execCommand('copy')
          ? message.success('上传成功，已拷贝到剪贴板')
          : message.warning('上传成功，拷贝到剪贴板失败， 请手动拷贝地址：' + content, 10) ;
    } catch (err) {
        message.error('上传成功, 拷贝到剪贴板时执行异常', err);
    }
    document.body.removeChild(textArea);
}

const UploadFileComponent = (props) => {

    const {children, callback} = props;

    const upload = (info) => {
        if (info.file.status === 'done' && info.file.response && info.file.response.status) {
            copyToClipboard(info.file.response.data)
            callback && callback(info.file.response.data)
        }
    }
    const action = '/v2/utils/upload';
    const style = props.style ? props.style : {}
    return (
        <UploadWrapper showUploadList={false} action={action} onChange={(info) => upload(info)} style={style}>
            {children}
        </UploadWrapper>
    )
}

export default UploadFileComponent;
