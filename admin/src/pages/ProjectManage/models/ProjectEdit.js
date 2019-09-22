import router from 'umi/router';
import { message } from 'antd';
import { getProject, deleteProject, UpdateProject } from '@/services/golang';

export default {
  namespace: 'ProjectEdit',

  state: {
    name: '',
    url: '',
    toc: '',
    frame: '',
    logoUrl: '',
    isPublic: 'true',
  },

  effects: {
    *init({ payload }, { call, put }) {
      // 获取 Project
      const r = yield call(getProject, payload);
      if (r.ret) {
        const data = {
          name: r.res.Name,
          url: r.res.Url,
          frame: r.res.Frame,
          articles: r.res.Articles,
          logoUrl: r.res.Logo_url,
          description: r.res.Description,
          isPublic: r.res.Is_public ? 'true' : 'false',
        };
        yield put({
          type: 'update',
          payload: data,
        });
      }
    },
    *submit({ payload }, { call }) {

      const r = yield call(UpdateProject, payload);
      if (r.ret) {
        message.success(r.res);
        if (payload.oldUrl !== payload.url) {
          router.push({
            pathname: `/ProjectManage/ProjectEdit/${payload.url}`,
          })
          message.success('检测到url发生变化，已自动执行重定向');
        }

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
