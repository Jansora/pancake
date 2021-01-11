/*
* @file User.jsx
* @author jansora
* @date 2020/2/5
*/


import {client} from "./index";
import {message} from "antd";
import {defaultValue} from "../store/global";


export const FetchCurrentUser = (setUser) => {
    client.get("fetchCurrentUser")
        .then(setUser)
};



export const UserLogin = (data, setLoading, callback) => {

    setLoading(true);
    client.post('login', data)
        .then(response =>  {
          callback(response)
          message.success(`欢迎回来~ ${data.Name}`)
        }).catch( e => {

    }).finally(()=> {
        setLoading(false);
    })


    return null;
};


export const UserLogout = (callback) => {
    client.post("logout")
        .then( response => {
          callback(defaultValue)
        })
    return null;
};
