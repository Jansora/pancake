import {
  DeleteTopic,
  getArticleList,
  getTopic,
  getTopicArticleList,
  getTopics,
  InsertTopic,
  UpdateTopic
} from '@/services/golang';
import {message} from 'antd';
//import { InsertTopic } from '../../../services/golang';

export default {
  namespace: 'Topic',

  state: {
    TopicInsert: {
      articles: [],
    },
    TopicList: {
      tableData: []
    },
    ArticleList: [],
    TopicEdit: {
      name: "",
      url: "",
      toc: "",
      articles: [],
      logoUrl: "",
      isPublic: "true",
    },
    Inserts: {
      title: "32fdsfas",
      site: "dsadfds",
      author: "dsfszf",
      summary: "fdafd",
      content: "fdsgfjhfasd",
      toc: [],
      tags: ["dsfdsfdafdca"],
      logoUrl: "dsfdsfdafdca",
      isPublic: "true",
    },
  },

  effects: {

    * initTopicList({payload}, {call, put}) {
      const r = yield call(getTopics, payload);
      if (r.ret) {
        yield put({
          type: 'updateTopicList',
          payload: r.res,
        });
      } else {
        message.error(r.res)
      }
    },


    * Insert({payload}, {put}) {
      yield put({
        type: '_Insert',
        payload,
      });
    },

    * initTopicEdit({payload}, {call, put}) {

      let r = yield call(getTopic, payload);
      if (r.ret) {
        payload.res = r.res;
        yield put({
          type: 'updateTopicEdit',
          payload,
        });

        const r2 = yield call(getTopicArticleList);
        if (r2.ret) {
          yield put({
            type: 'updateTopicInsert',
            payload: r2.res,
          });
        } else {
          message.error(r.res)
        }
      } else {
        message.error(r.res)
      }
    },
    * initArticleList(_, {call, put}) {
      const r = yield call(getArticleList);
      const payload = {};
      if (r.ret) {
        payload.res = r.res;
        yield put({
          type: 'updateArticleList',
          payload,
        });
      }

    },
    * initTopicInsert(_, {call, put}) {
      const r = yield call(getTopicArticleList);
      console.log(r)
      if (r.ret) {
        yield put({
          type: 'updateTopicInsert',
          payload: r.res,
        });
      } else {
        message.error(r.res)
      }
    },
    * InsertSubmit({payload}, {call, put}) {

      const r = yield call(InsertTopic, payload);
      if (r.ret) {
        message.success(r.res);
        //window.open(`https://editor.jans.xin?url=${payload.url}`)
        // payload.tags = Array(...new Set([].concat(...r.res)))
      } else {
        message.error(r.res);
      }
    },
    * EditSubmit({payload}, {call, put}) {

      const r = yield call(UpdateTopic, payload);
      if (r.ret) {
        message.success(r.res);
        // payload.tags = Array(...new Set([].concat(...r.res)))
      } else {
        message.error(r.res);
      }
    },

    * UpdateContent({payload}, {call, put}) {
      yield put({
        type: 'updateArticleInsert',
        payload,
      });
    },

    * deleteTopic({payload}, {call, put}) {

      const {url} = payload;
      const r = yield call(DeleteTopic, payload)

      if (r.ret) {
        message.success("刪除成功");
        const r2 = yield call(getTopics, payload);
        if (r2.ret) {
          yield put({
            type: 'updateTopicList',
            payload: r2.res,
          });
        } else {
          message.error(r.res)
        }
        // payload.tags = Array(...new Set([].concat(...r.res)))
      } else {
        message.error("xxxxxx", r.res);
      }
    }
  },

  reducers: {
    updateTopicInsert(state, action) {

      return {
        ...state,
        TopicInsert: {
          ...state.TopicInsert,
          articles: action.payload,
        }
      };
    },
    updateTopicList(state, action) {
      const {TopicList} = state;
      return {
        ...state,
        TopicList: {
          ...TopicList,
          tableData: action.payload,
        }
      };
    },
    updateTopicEdit(state, action) {

      const {res} = action.payload;
      return {
        ...state,
        TopicEdit: {
          name: res.Name,
          url: res.Url,
          toc: res.Toc,
          articles: res.Articles,
          logoUrl: res.Logo_url,
          description: res.Description,
          isPublic: res.Is_public ? "true" : "false",
        }
      };
    },
  },
};
