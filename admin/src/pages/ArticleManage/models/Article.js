import { routerRedux } from 'dva/router';
import {getArticle, getArticleList, getTags, InsertArticle ,deleteArticle, UpdateArticle} from '@/services/golang';
import {message} from 'antd';

import {InitArticleEditState} from '../data';
export default {
  namespace: 'Article',

  state: {
    ArticleInsert:{
      tags:[],
    },
    ArticleList:[],
    ArticleEdit:{
      ...InitArticleEditState,
    },
    Inserts:{
      title: "32fdsfas",
      site: "dsadfds",
      author: "dsfszf",
      summary: "fdafd",
      content:"fdsgfjhfasd",
      toc: [],
      tags: ["dsfdsfdafdca"],
      logoUrl: "dsfdsfdafdca",
      isPublic: "true",
    },
  },

  effects: {
    *Insert({ payload }, { put }) {
        yield put({
          type: '_Insert',
          payload,
        });
    },
    *initArticleEdit({ payload }, { call, put }) {

      const {url} = payload;
      yield put({
        type: 'initArticleEditContent',
      });
      let r = yield call(getArticle, payload);
      if (r.ret){
        payload.res = r.res;
        yield put({
          type: 'updateArticleEdit',
          payload,
        });
     
        r = yield call(getTags);
        payload.tags = [];
        if (r.ret){
          payload.tags = Array(...new Set([].concat(...r.res)))
        }
        yield put({
          type: 'updateArticleInsert',
          payload,
        });
      }
      else {
        message.error(r.res)
      }
    },
    *initArticleList(_, { call, put }) {
      const r = yield call(getArticleList);
      const payload = {};
      if (r.ret){
        payload.res = r.res;
        yield put({
          type: 'updateArticleList',
          payload,
        });
      }
      
    },
    *initArticleInsert(_, { call, put }) {
      const r = yield call(getTags);
      const payload = {tags:[]};
      if (r.ret){
        payload.tags = Array(...new Set([].concat(...r.res)))
      }
      yield put({
        type: 'updateArticleInsert',
        payload,
      });
    },
    *InsertSubmit({payload}, { call, put }) {
      console.log('payload', payload)
      const r = yield call(InsertArticle, payload);
      if (r.ret){
        message.success(r.res);
       // payload.tags = Array(...new Set([].concat(...r.res)))
      } else {
        message.error(r.res);
      }
    },
    *EditSubmit({payload}, { call, put }) {
    
      const r = yield call(UpdateArticle, payload);
      if (r.ret){
        message.success(r.res);
        // payload.tags = Array(...new Set([].concat(...r.res)))
      } else {
        message.error(r.res);
      }
    },
    
    *UpdateContent({payload}, { call, put }) {
      yield put({
        type: 'updateArticleInsert',
        payload,
      });
    },
    
    *deleteArticle({ payload }, { call, put }) {
  
      const {url} = payload;
      const r = yield call(deleteArticle, payload)
      
      if (r.ret){
        message.success("刪除成功");
        const r2 = yield call(getArticleList);
        if (r2.ret){
          yield put({
            type: 'updateArticleList',
            payload:r2,
          });
          routerRedux.push('/ArticleManage/ArticleList')
        }
        // payload.tags = Array(...new Set([].concat(...r.res)))
      } else {
        message.error("", r.res);
      }
    }
  },

  reducers: {
    initArticleEditContent(state, action) {
      return {
        ...state,
        ArticleEdit:{
          ...state.ArticleEdit,
          content: undefined,
        }
      };
    },
    updateArticleInsert(state, action) {
      return {
        ...state,
        ArticleInsert:{
          ...state.ArticleInsert,
          ...action.payload,
        }
      };
    },
    updateArticleList(state, action) {
      return {
        ...state,
        ArticleList:action.payload.res
      };
    },
    updateArticleEdit(state, action) {
      const {res} = action.payload;
      return {
        ...state,
        ArticleEdit:{
          title: res.Title,
          site: res.Site,
          url: res.Url,
          author: res.Author,
          summary: res.Summary,
          content: res.Content,
          toc: res.Toc,
          tags: res.Tags,
          logoUrl: res.Logo_url,
          isPublic: res.Is_public ? "true" : "false",
        }
      };
    },
  },
};
