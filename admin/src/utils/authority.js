import router from 'umi/router'


// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str; // authorityString could be admin, 'admin', ['admin']

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  } // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }

  return authority;
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
