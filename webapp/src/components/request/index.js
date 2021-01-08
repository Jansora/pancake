import axios from 'axios';
import {message} from "antd";

export const client = axios.create(
  {
    baseURL: "/api/",
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
);

// 添加请求拦截器
client.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
client.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log("response", response)

  // 特殊处理
  if(response.config.url.startsWith("playground")) return response.data;

  if(response.data.status) {
    return response.data.data;
  }
  message.error(response.data.errorDesc)
  return Promise.reject(response);
}, function (error) {
  // 对响应错误做点什么
  const {response} = error;
  // console.log(error, response)
  if(response && response.data &&  response.data.status === false) {
    message.error(response.data.errorDesc)
  } else {
    message.error(`请求时出现异常, HTTP状态码: ${response.status}, ${response.statusText}`)
  }
  return Promise.reject(response);
});
