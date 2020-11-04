import { message } from 'antd';
import { getProjects } from '@/services/golang';

export default {
  namespace: 'ProjectList',

  state: {
    Projects: [],
  },

  effects: {
    *init(_, { call, put }) {
      const r = yield call(getProjects);
      if (r.ret) {
        const Projects = r.res;
        yield put({
          type: 'update',
          payload: { Projects },
        });
        message.success(`获取项目列表成功. 共有 ${Projects.length} 条 `)
      } else {
        message.error(r.res)
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
