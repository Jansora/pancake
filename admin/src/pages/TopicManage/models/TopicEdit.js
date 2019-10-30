import router from 'umi/router';
import { message } from 'antd';
import { getTopic, getTopicArticleList, deleteTopic, UpdateTopic } from '@/services/golang';

export default {
  namespace: 'TopicEdit',

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
      const r = yield call(getTopic, payload);
      if (r.ret) {
        const data = {
          name: r.res.Name,
          url: r.res.Url,
          articles: r.res.Articles.map(JSON.parse),
          logoUrl: r.res.Logo_url,
          description: r.res.Description,
          isPublic: r.res.Is_public ? 'true' : 'false',
        };
        yield put({
          type: 'update',
          payload: { data },
        });
        message.success('获取专栏信息成功.');
        const r2 = yield call(getTopicArticleList);
        if (r2.ret) {
          const articles = r2.res;
          yield put({
            type: 'update',
            payload: { articles },
          });
          message.success('获取文档节点列表成功.')
        } else {
          message.error(r.res)
        }
      } else {
        message.error(r.res)
      }


    },
    *submit({ payload }, { call }) {
      const r = yield call(UpdateTopic, payload);
      if (r.ret) {
        message.success(r.res);
        if (payload.oldUrl !== payload.url) {
          router.push({
            pathname: `/TopicManage/TopicEdit/${payload.url}`,
          });
          message.success('检测到url发生变化，已自动执行重定向');
        }
      } else {
        message.error(r.res);
      }
    },

    *delete({ payload, callback }, { call }) {

      const {url} = payload;
      const r = yield call(deleteTopic, payload);
      if (r.ret) {
        message.success('刪除成功');
        callback(r)
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
