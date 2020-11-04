import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { message } from 'antd';
import { getFakeCaptcha } from '@/services/login';
import { fakeAccountLogin, Logout } from '@/services/golang';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';


const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (response.ret) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully
        window.location.href = '/';
        // yield put(routerRedux.replace('/'));
      } else {
        message.error(response.res)
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put, call }) {
      const { redirect } = getPageQuery(); // redirect
      const response = yield call(Logout);
      if (!response.ret){
         message.error('退出登录失败')
      } else {
        message.success('退出登录成功');
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
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, ...payload };
    },
  },
};
export default Model;
