import router from 'umi/router';
import { message } from 'antd';
import { getTags, InsertArticle } from '@/services/golang';


export default {
  namespace: 'ArticleInsert',

  state: {
    tags: [],
  },

  effects: {
    *init(_, { call, put }) {
      const r = yield call(getTags);
      const tags = {};
      // 从大到小排下序
      r.res.forEach(item => {
        item.forEach(tag => {
          if (tags.hasOwnProperty(tag)){
            tags[tag] += 1
          } else {
            tags[tag] = 1
          }
        })
      });
      const sortable = Object.keys(tags).map( tag => [tag, tags[tag]]);
      sortable.sort((a, b) => {
        return b[1] - a[1];
      });

      yield put({
        type: 'update',
        payload: { tags: sortable.map(e => e[0]) },
      });
    },
    *submit({ payload }, { call }) {
      const r = yield call(InsertArticle, payload);
      if (r.ret) {
        router.push({
          pathname: `/ArticleManage/ArticleEdit/${payload.url}`,
        });
        message.success(`${r.res}, 已跳转到编辑页面`);
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
