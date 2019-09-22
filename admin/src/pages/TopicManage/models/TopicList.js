import { message } from 'antd';
import { getTopics } from '@/services/golang';

export default {
  namespace: 'TopicList',

  state: {
    Topics: [],
  },

  effects: {
    *init(_, { call, put }) {
      const r = yield call(getTopics);
      if (r.ret) {
        const Topics = r.res;
        yield put({
          type: 'update',
          payload: { Topics },
        });
        message.success(`获取专栏列表成功. 共有 ${Topics.length} 条 `)
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
