/*
* @file utils.jsx
* @author jansora
* @date 2020/2/7
*/


import {client} from "./index";

export const UploadFile = (file, callback) => {


    const formData = new FormData();
    formData.append('file', file);

    return client.post('utils/upload', formData)
        .then(response =>  {
            callback(response)
        }).catch( e => {
    }).finally(()=> {
    })
};
