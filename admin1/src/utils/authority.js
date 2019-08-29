// use localStorage to store the authority info, which might be sent from server in actual project.
import { routerRedux } from 'dva/router';
import {stringify} from "qs";

export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['admin'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}


export function getLoginInfo() {
  const loginId  = localStorage.getItem("loginId")  ? parseInt(localStorage.getItem("loginId"), 10)  : "";
  const loginUser  = localStorage.getItem("loginUser")  ? localStorage.getItem("loginUser")  : "";
  const loginToken = localStorage.getItem("loginToken") ? localStorage.getItem("loginToken") : "";
  if(loginToken === ""){
    routerRedux.push({
      pathname: '/user/login',
      search: stringify({
        redirect: window.location.href,
      }),
    })
  }
  return {
    loginId,
    loginUser,
    loginToken,
  };
};

export function setLoginInfo(r){
  localStorage.setItem("loginId", r.loginId.toString()) ;
  localStorage.setItem("loginUser", r.loginUser) ;
  localStorage.setItem("loginToken", r.loginToken) ;
};
