import router from 'umi/router';
import { message } from 'antd';
import { deleteProject, InsertProject } from '@/services/golang';

export default {
  namespace: 'ProjectInsert',

  state: {

  },

  effects: {
    *init({ payload }, { call, put }) {
      // 获取 Article

    },
    *submit({ payload }, { call }) {
      const r = yield call(InsertProject, payload);
      if (r.ret) {
        message.success(r.res);
        router.push({
          pathname: `/ProjectManage/ProjectEdit/${payload.url}`,
        });
        message.success('已自动重定向到专栏编辑面板');
      } else {
        message.error(r.res);
      }
    },

    *delete({ payload }, { call }) {
      const r = yield call(deleteProject, payload);
      if (r.ret) {
        message.success('刪除成功');
        message.success('已自动重定向到专栏列表面板');
        router.push({
          pathname: '/ProjectManage/ProjectList',
        })
      } else {
        message.error(r.res);
      }
    },
  },

  reducers: {
    update(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
