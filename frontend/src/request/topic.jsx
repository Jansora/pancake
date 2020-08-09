/*
* @file topic.jsx
* @author jansora
* @date 2020/2/16
*/


/*
* @file topic.jsx
* @author jansora
* @date 2020/2/5
*/


import React, {useEffect, useState} from "react";
import {client} from "./index";
import {message, notification} from "antd";
import {stringify} from "qs"


export const AddTopic = (data, setOpen) => {

    client.post('topic/add', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
              notification.success({
                message: "专栏-创建专栏",
                description: `创建成功`,
                duration: 2,
              })
                // setTopic(data.data)
                setOpen(false)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};

export const UpdateTopic = (data, setOpen, setTopic) => {

    client.post('topic/update', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
              notification.success({
                message: "专栏-更新专栏",
                description: `更新成功`,
                duration: 2,
              })
                setTopic && setTopic(data.data)
                setOpen && setOpen(false)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};

export const UpdateTopicLike = (id, setLoading, setTopic) => {

    client.post('topic/addLike/' + id )
        .then(response =>  {
            const { data } = response;
            if (data.status){
                setTopic && setTopic(data.data)
                setLoading && setLoading(false)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};

export const AutoSaveTopic = (data, setOpen, setTopic, setAutoSave) => {

    client.post('topic/autoSave', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
                setTopic && setTopic(data.data)
                setOpen && setOpen(false)
                setAutoSave && setAutoSave(data.data.updateAt)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};


export const QueryTopic = (resource) => {


    const [topic, setTopic] = useState({
        title: '加载中',
    });
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        if(loading) {
            client.get(`topic/${resource}`)
                .then(response =>  {
                    const { data } = response;
                    if (data.status){
                        setTopic(data.data)
                    } else {
                        message.error(data.message)
                    }

                }).catch( e => {
            }).finally(()=> { setLoading(false)
            })
        }

    }, [resource, loading]);



    return [topic, setTopic, loading, setLoading];
};

export const QueryTopics = () => {

    const [topics, setTopics] = useState([]);
    const [total, setTotal] = useState([]);


    useEffect(() => {

        client.get(`topic/queryTopics`).then(response => {
            const {data} = response;
            if (data.status) {
                setTotal(data.total)
                setTopics(data.data);

              notification.success({
                message: "专栏-获取专栏列表",
                description: `共 ${data.data.length} 个专栏`,
                duration: 2,
              })
            } else {
                message.error(data.message);
            }
        }).finally();
    }, [])

    return [topics, total];
};
export const DeleteTopic = (id, callback) => {

    client.delete(`topic/${id}`)
        .then(response => {
            const {data} = response;
            if (data.status) {
              notification.success({
                message: "专栏-删除专栏",
                description: `删除成功`,
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
