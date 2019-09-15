import {routerRedux} from 'dva/router';
import {stringify} from 'querystring';
import {fakeAccountLogin} from '@/services/golang';
import {setAuthority, setLoginInfo} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import {reloadAuthorized} from '@/utils/Authorized';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    * login({payload}, {call, put}) {
      const response = yield call(fakeAccountLogin, payload);

      // Login successfully
      if (response.status === 'ok') {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        setLoginInfo(response);

        reloadAuthorized();

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        message.error("登录失败")
      }
    },


    * logout(_, {put}) {
      const {redirect} = getPageQuery(); // redirect

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
  reducers: {
    changeLoginStatus(state, {payload}) {
      setAuthority(payload.currentAuthority);
      return {...state, status: payload.status, type: payload.type};
    },
  },
};
export default Model;
