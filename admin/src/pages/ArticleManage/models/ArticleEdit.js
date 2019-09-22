import router from 'umi/router';
import { message } from 'antd';
import { getTags, UpdateArticle, getArticle, deleteArticle } from '@/services/golang';

export default {
  namespace: 'ArticleEdit',

  state: {
    tags: [],
    data: {
      title: '',
      site: '',
      author: '',
      summary: '',
      content: '',
      toc: [],
      tags: [],
      logoUrl: '',
      isPublic: 'true',
    },
  },

  effects: {
    *init({ payload }, { call, put }) {
      // 获取 Article
      const r1 = yield call(getArticle, payload);
      let data;
      if (r1.ret) {
        const { res } = r1;
        data = {
          title: res.Title,
          site: res.Site,
          url: res.Url,
          author: res.Author,
          summary: res.Summary,
          content: res.Content,
          toc: res.Toc,
          tags: res.Tags,
          logoUrl: res.Logo_url,
          isPublic: res.Is_public ? 'true' : 'false',
        }
      }
      // 获取 Tag list
      const r2 = yield call(getTags);
      let tags = {};
      if (r2.ret) {
        // 从大到小排下序
        r2.res.forEach(item => {
          item.forEach(tag => {
            if(tags.hasOwnProperty(tag)){
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
        tags = sortable.map(e => e[0])
      }

      if (r1.ret && r2.ret) {
        yield put({
          type: 'update',
          payload: {data, tags},
        });
      }


    },
    *submit({ payload }, { call }) {
      const r = yield call(UpdateArticle, payload);
      if (r.ret) {
        message.success(r.res);
        if (payload.oldUrl !== payload.url) {
          router.push({
            pathname: `/ArticleManage/ArticleEdit/${payload.url}`,
          });
          message.success('检测到url发生变化，已自动执行重定向');
        }
      } else {
        message.error(r.res);
      }
    },
    *delete({ payload }, { call }) {

      const r = yield call(deleteArticle, payload);

      if (r.ret) {
        message.success('刪除成功');
        router.push({
          pathname: '/ArticleManage/ArticleList',
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
