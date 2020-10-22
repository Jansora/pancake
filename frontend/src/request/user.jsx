/*
* @file User.jsx
* @author jansora
* @date 2020/2/5
*/


import React, {useEffect, useState} from "react";
import {stringify} from "qs";
import {client} from "./index";
import {message} from "antd";


import {defaultValue} from "../store/global";


export const QueryUser = (id) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if(id) {
      client.get(`user/queryUser/${id}`)
        .then( response => {
          const { data } = response;
          if(data.status){
            setUser(data.data)
          }
        })
    }
  }, [id])

  return [user];
};

export const QueryCurrentUser = (setUser) => {
    client.get("user/queryCurrentUser")
        .then( response => {
            const { data } = response;
            if(data.status){
                setUser(data.data)
            } else {
                setUser(defaultValue.user)
            }
     })
    return null;
};


export const UserRegister = (data, setLoading, setOpen, setUser) => {

    setLoading(true);
    client.post('user/register', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
                message.success(`注册成功~ ${data.data.alias}`)
                setOpen(false);
                setLoading(false);
                setUser(data.data)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
        setLoading(false);
    })


    return null;
};

export const UserLogin = (data, setLoading, setOpen, setUser) => {

    setLoading(true);
    client.post('user/login', stringify(data))
        .then(response =>  {
            const { data } = response;
            if (data.status){
                message.success(`欢迎回来~ ${data.data.alias}`)
                setOpen(false);
                setLoading(false);
                setUser(data.data)
            } else {
                message.error(data.message)
            }

        }).catch( e => {
    }).finally(()=> {
        setLoading(false);
    })


    return null;
};


export const UserLogout = (setUser) => {
    client.post("user/logout")
        .then( response => {
            const { data } = response;
            if(data.status){
                setUser()
                message.warning("你已经退出登录")
            }
        })
    return null;
};

export const UpdateUser = (data, setOpen, setUser) => {
    client.post("user/update", stringify(data))
        .then( response => {
            const { data } = response;
            if(data.status){
                setOpen(false)
                setUser(data.data)
                message.success("更新成功")
            }
        })
};
