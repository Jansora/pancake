import { message } from 'antd';
import { getArticleList } from '@/services/golang';

export default {
  namespace: 'ArticleList',

  state: {
    Articles: [],
  },

  effects: {
    *init(_, { call, put }) {
      const r = yield call(getArticleList);
      if (r.ret) {
        const Articles = r.res;
          yield put({
          type: 'update',
          payload: { Articles },
        });
        message.success(`获取博客列表成功. 共有 ${Articles.length} 条 `)
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
