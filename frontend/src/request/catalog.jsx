/*
* @file catalog.jsx
* @author jansora
* @date 2020/2/17
*/


import React, {useEffect, useState} from "react";
import {client} from "./index";
import {stringify} from "qs";
import {message, notification} from "antd";

export const AddCatalog = (data, setOpen) => {

    client.post('catalog/add', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
                notification.success({
                  message: "专栏-添加节点",
                  description: "添加成功",
                  duration: 2,
            })
                // setPost(data.data)
                setOpen(false)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};

export const AddPostFromExistRequest = (data, resource, setOpen) => {

    client.post(`catalog/addDocFromExist`, stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
              notification.success({
                message: "专栏-添加节点",
                description: "添加成功",
                duration: 2,
              })
                setOpen(false)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};

export const UpdateCatalog = (data, callback) => {

    client.post('catalog/update', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
              notification.success({
                message: "专栏-更新节点",
                description: "更新成功",
                duration: 2,
              })
                // setPost(data.data)
                callback()
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};


export const QueryCatalogs = (resource) => {

    const [catalog, setCatalogs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(loading) {
            client.get(`catalog/${resource}`).then(response => {
                const {data} = response;
                if (data.status) {
                    setCatalogs(data.data);
                } else {
                    message.error(data.message);
                }
            }).finally(()=> setLoading(false));
        }
    }, [loading, resource])

    return [catalog, setCatalogs, loading, setLoading];
};

export const DeleteCatalog = (id, callback) => {


    client.delete(`catalog/${id}`)
        .then(response => {
            const {data} = response;
            if (data.status) {
              notification.success({
                message: "专栏-删除添加",
                description: "删除成功",
                duration: 2,
              })
                callback && callback()
            } else {
                message.error(data.message)
            }

        }).catch(e => {
    }).finally(() => {

    })


}
