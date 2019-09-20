import router from 'umi/router'
import {checkLogin} from '../services/golang';


export function getAuthority(str) {


  const promise = checkLogin();
  promise.then(
    e => {
      const userInfo = getLoginInfo()
      if (!e.ret || !userInfo.loginId || !userInfo.loginToken || !userInfo.loginUser) {
        router.push({
          pathname: '/user/login',
        })
      }
      return []
    }
  )

  return ['admin', 'user'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}


export function getLoginInfo() {
  const loginId = localStorage.getItem('loginId') ? parseInt(localStorage.getItem('loginId'), 10) : '';
  const loginUser = localStorage.getItem('loginUser') ? localStorage.getItem('loginUser') : '';
  const loginToken = localStorage.getItem('loginToken') ? localStorage.getItem('loginToken') : '';
  if (loginToken === '') {
    router.push({
      pathname: '/user/login',
    })
  }
  return {
    loginId,
    loginUser,
    loginToken,
  };
};

export function setLoginInfo(r) {
  localStorage.setItem('loginId', r.loginId.toString());
  localStorage.setItem('loginUser', r.loginUser);
  localStorage.setItem('loginToken', r.loginToken);
};
