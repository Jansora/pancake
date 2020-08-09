/*
* @file utils.jsx
* @author jansora
* @date 2020/2/7
*/


import React from "react";
import {client} from "./index";
import {message} from "antd";

export const UploadFile = (file, callback) => {

    const formData = new FormData();
    formData.append('file', file);

    client.post('utils/upload', file)
        .then(response =>  {
            const { data } = response;
            if (data.status){
                callback(data.data)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};
