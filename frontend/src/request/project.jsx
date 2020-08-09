/*
* @file project.jsx
* @author jansora
* @date 2020/2/16
*/


/*
* @file project.jsx
* @author jansora
* @date 2020/2/5
*/


import React, {useEffect, useState} from "react";
import {client} from "./index";
import {message, notification} from "antd";
import {stringify} from "qs"


export const AddProject = (data, setOpen) => {

    client.post('project/add', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
              notification.success({
                message: "项目-创建项目",
                description: "创建成功",
                duration: 2,
              })
                // setProject(data.data)
                setOpen(false)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};

export const UpdateProject = (data, setOpen, setProject) => {

    client.post('project/update', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
              notification.success({
                message: "项目-更新项目",
                description: "更新成功",
                duration: 2,
              })
                setProject && setProject(data.data)
                setOpen && setOpen(false)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};

export const UpdateProjectLike = (id, setLoading, setProject) => {

    client.post('project/addLike/' + id )
        .then(response =>  {
            const { data } = response;
            if (data.status){
                setProject && setProject(data.data)
                setLoading && setLoading(false)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};

export const AutoSaveProject = (data, setOpen, setProject, setAutoSave) => {

    client.post('project/autoSave', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
                setProject && setProject(data.data)
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


export const QueryProject = (resource) => {


    const [project, setProject] = useState({
        title: '加载中',
        iframe: ''
    });
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        if(loading) {
            client.get(`project/${resource}`)
                .then(response =>  {
                    const { data } = response;
                    if (data.status){
                        setProject(data.data)
                    } else {
                        message.error(data.message)
                    }

                }).catch( e => {
            }).finally(()=> { setLoading(false)
            })
        }

    }, [resource, loading]);



    return [project, setProject, loading, setLoading];
};

export const QueryProjects = () => {

    const [projects, setProjects] = useState([]);
    const [total, setTotal] = useState([]);


    useEffect(() => {

        client.get(`project/queryProjects`).then(response => {
            const {data} = response;
            if (data.status) {
                setTotal(data.total)
                setProjects(data.data);
              notification.success({
                message: "项目-获取项目列表",
                description: `共 ${data.data.length} 个专栏`,
                duration: 2,
              })
            } else {
                message.error(data.message);
            }
        }).finally();
    }, [])

    return [projects, total];
};
export const DeleteProject = (id, callback) => {

    client.delete(`project/${id}`)
        .then(response => {
            const {data} = response;
            if (data.status) {
              notification.success({
                message: "项目-删除项目",
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
