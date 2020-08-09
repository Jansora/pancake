/*
* @file comment.jsx
* @author jansora
* @date 2020/2/14
*/


import React, {useEffect, useState} from "react";
import {client} from "./index";
import {message, notification} from "antd";
import {stringify} from "qs"


export const AddComment = (data, setFetch) => {

    client.post('comment/insert', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
              notification.success({
                message: "留言板-添加留言",
                description: "添加成功",
                duration: 2,
              })
                setFetch(true)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {})


    return null;
};

export const UpdateComment = (data, setFetch) => {

    client.post('comment/update', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
              notification.success({
                message: "留言板-更新留言",
                description: "更新成功",
                duration: 2,
              })
                setFetch(true)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};

export const DeleteComment = (data, setFetch) => {

    client.post('comment/delete', stringify(data))
        .then( response =>  {
            const { data } = response;
            if (data.status){
              notification.success({
                message: "留言板-删除留言",
                description: "删除成功",
                duration: 2,
              })
                setFetch(true)

            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};


export const QueryComments = (parentId, ownerType) => {


    const [comments, setComments] = useState([]);
    const [fetch, setFetch] = useState(true);
    useEffect(()=> {
        if(fetch) {
            client.get(`comment/query?${stringify({parentId, ownerType})}`)
                .then(response =>  {
                    const { data } = response;
                    if (data.status){
                        setComments(data.data)
                    } else {
                        message.error(data.message)
                    }

                }).catch( e => {
            }).finally(()=> { setFetch(false)})
        }

    }, [parentId, fetch, ownerType]);

    return [comments, setComments, fetch, setFetch];
};
