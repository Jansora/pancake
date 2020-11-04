import router from 'umi/router';
import { message } from 'antd';
import { getTopic, getTopicArticleList, deleteTopic, UpdateTopic, InsertTopic } from '@/services/golang';

export default {
  namespace: 'TopicInsert',

  state: {
    articles: [],
    data: {
      tags: [],
      logoUrl: '',
      isPublic: 'true',
      name: '',
      url: '',
      articles: [],
    },
  },

  effects: {
    *init({ payload }, { call, put }) {
      // 获取 Article

      const r = yield call(getTopicArticleList);
      if (r.ret) {
        const articles = r.res;
        yield put({
          type: 'update',
          payload: { articles },
        });
        message.success('获取文档节点列表成功.')
      } else {
        message.error(r.res)
      }

    },
    *submit({ payload }, { call }) {
      const r = yield call(InsertTopic, payload);
      if (r.ret) {
        message.success(r.res);
        router.push({
          pathname: `/TopicManage/TopicEdit/${payload.url}`,
        });
        message.success('已自动重定向到专栏编辑面板');
      } else {
        message.error(r.res);
      }
    },

    *delete({ payload }, { call }) {
      const r = yield call(deleteTopic, payload);
      if (r.ret) {
        message.success('刪除成功');
        message.success('已自动重定向到专栏列表面板');
        router.push({
          pathname: '/TopicManage/TopicList',
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
