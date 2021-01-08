/*
* @file User.jsx
* @author jansora
* @date 2020/2/5
*/


import {client} from "./index";
import {message} from "antd";
import {defaultValue} from "../store/global";


export const FetchCurrentUser = (setUser) => {
    client.get("user/fetchCurrentUser")
        .then(setUser)
};


export const UserRegister = (data, setLoading, callback) => {

    setLoading(true);
    client.post('user/register', data)
        .then(response =>  {
          callback(response)
          message.success(`注册成功~ ${data.data.alias}`)

        }).catch( e => {
    }).finally(()=> {
        setLoading(false);
    })


    return null;
};

export const UserLogin = (data, setLoading, callback) => {

    setLoading(true);
    client.post('user/login', data)
        .then(response =>  {
          callback(response)
          message.success(`欢迎回来~ ${data.data.alias}`)
        }).catch( e => {
    }).finally(()=> {
        setLoading(false);
    })


    return null;
};


export const UserLogout = (callback) => {
    client.post("user/logout")
        .then( response => {

          callback(defaultValue)
        })
    return null;
};

export const UpdateUser = (data, setOpen, setUser) => {
    client.post("user/update", data)
        .then( response => {
            const { data } = response;
            if(data.status){
                setOpen(false)
                setUser(data.data)
                message.success("更新成功")
            }
        })
};
