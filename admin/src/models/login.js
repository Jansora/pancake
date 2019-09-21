import {routerRedux} from 'dva/router';
import {stringify} from 'querystring';
import {fakeAccountLogin} from '@/services/golang';
import {setLoginInfo} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import {message} from "antd";

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
        setLoginInfo(response);

        yield put(routerRedux.replace('/'));
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
  },
};
export default Model;
