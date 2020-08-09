/*
* @file post.jsx
* @author jansora
* @date 2020/2/5
*/


import React, {useEffect, useState} from "react";
import {client} from "./index";
import {message, notification} from "antd";
import {stringify} from "qs"


export const AddPost = (data, callback) => {



    client.post('post/add', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
                notification.success({
                    message: "博客-添加文章",
                    description: "添加成功",
                    duration: 2,
                })
                // setPost(data.data)
                callback && callback(data.data.url)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};

export const UpdatePost = (data, callback) => {

    client.post('post/update', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
                notification.success({
                    message: "博客-更新文章",
                    description: "更新成功",
                    duration: 2,
                })
                callback && callback()
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};

export const UpdatePostLike = (resource, setLoading, setPost) => {

    client.post('post/addLike/' + resource )
        .then(response =>  {
            const { data } = response;
            if (data.status){
                setPost && setPost(data.data)
                setLoading && setLoading(false)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};

export const AutoSavePost = (data, setOpen, setPost, setAutoSave) => {

    client.post('post/autoSave', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
                setPost && setPost(data.data)
                setOpen && setOpen(false)
                setAutoSave && setAutoSave()
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
    })


    return null;
};


export const QueryPost = (resource, updateToc) => {



    const [post, setPost] = useState({
        title: '加载中',
    });
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        if(resource) {
            setLoading(true)
        }
    }, [resource])

    useEffect(()=> {
        if (loading && resource) {
            client.get(`post/${resource}`)
                .then(response =>  {
                    const { data } = response;
                    if (data.status){
                        setPost(data.data)
                        updateToc && updateToc()
                    } else {
                        message.error(data.message)
                    }

                }).catch( e => {
            }).finally(()=> { setLoading(false)
            })

        }


    }, [resource, loading]);



    return [post, setPost, loading, setLoading];
};

export const QueryPosts = (tag, title, offset, orderBy, sort,  setOffset) => {

    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState([]);
    const [lock, setLock] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        setOffset(0)
        setPosts([])
    },[tag, orderBy, sort, setOffset])


    useEffect(()=> {
        setLock(false);
    },[tag, offset, orderBy, sort])

    useEffect(()=> {
        if (!lock) {
            setLock(true);
            setLoading(true)
            const args = {sort, orderBy, tag, limit: 10, offset, title};
            client.get(`post/queryPosts?${stringify(args)}`).then(response => {
                const { data } = response;
                    if(data.status){
                        setTotal(data.total)
                        setPosts(posts.concat(data.data));
                        notification.success({
                            message: "博客-获取文章列表",
                            description: `当前已展示 ${posts.concat(data.data).length} / ${data.total} 条`,
                            duration: 2,
                        })
                    } else {
                        message.error(data.message);
                    }
                }).finally(() => setLoading(false));
        }
    }, [lock, offset, posts, tag, title, setLock, sort, orderBy]);
    return [posts, setPosts, total, lock, setLock, loading];
};


export const DeletePost = (id, callback) => {

    client.delete(`post/${id}`)
        .then(response => {
            const {data} = response;
            if (data.status) {
                notification.success({
                    message: "博客-删除文章",
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
    return null;
};

export const QueryLogos = () => {

    const [logos, setLogos] = useState([]);

    useEffect(() => {
        client.get(`post/queryLogos`).then( response => {
            const { data } = response;
            if(data.status){
                setLogos(data.data);
            } else {
                message.error(data.message);
            }
        }).finally();


    }, [setLogos]);


    return [logos, setLogos];
};
export const QueryTags = () => {

    const [tags, setTags] = useState([]);

    useEffect(() => {
        client.get(`post/queryTags`).then( response => {
            const { data } = response;
            if(data.status){
                setTags(Object.entries(data.data).sort((a,b) => b[1] - a[1]).map(tag => tag));
            } else {
                message.error(data.message);
            }
        }).finally();


    }, [setTags]);


    return [tags, setTags];
};

export const QueryHistory = (id) => {

    const [history, setHistory] = useState({
        id: null,
        createAt: null,
        updateAt: null,
        raw: null,
        ownerId: null,
        version: "NORMAL",
    });


    useEffect(() => {
        if(id ) {
            client.get(`post/queryHistory/${id}`)
                .then( response => {
                    const { data } = response;
                    if(data.status){
                        setHistory(data.data);
                    } else {
                        message.error(data.message);
                    }
                }).finally();
        }




    }, [id, setHistory]);


    return history;
};

export const QueryHistoryList = (id) => {

    const [historyList, setHistoryList] = useState([]);


    useEffect(() => {
        if (id) {
            client.get(`post/queryHistoryList/${id}`)
                .then( response => {
                    const { data } = response;
                    if(data.status){
                        setHistoryList(data.data);
                    } else {
                        message.error(data.message);
                    }
                }).finally();
        }
    }, [id, setHistoryList]);


    return historyList;
};
