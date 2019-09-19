import {DeleteProject, getArticleList, getProject, getProjects, InsertProject, UpdateProject,} from '@/services/golang';
import {message} from 'antd';
import router from "umi/router";

export default {
  namespace: 'Project',

  state: {
    ProjectInsert: {
      articles: [],
    },
    ProjectList: {
      tableData: []
    },
    ProjectEdit: {
      name: "",
      url: "",
      toc: "",
      frame: "",
      // articles: [],
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

    * initProjectList({payload}, {call, put}) {
      const r = yield call(getProjects, payload);
      if (r.ret) {
        yield put({
          type: 'updateProjectList',
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

    * initProjectEdit({payload}, {call, put}) {

      let r = yield call(getProject, payload);
      if (r.ret) {
        payload.res = r.res;
        yield put({
          type: 'updateProjectEdit',
          payload,
        });

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

    * InsertSubmit({payload}, {call, put}) {

      const r = yield call(InsertProject, payload);
      if (r.ret) {
        message.success(r.res);

        router.push({
          pathname: `/ProjectManage/ProjectEdit/${payload.url}`,
        })

      } else {
        message.error(r.res);
      }
    },
    * EditSubmit({payload}, {call, put}) {

      const r = yield call(UpdateProject, payload);
      if (r.ret) {
        message.success(r.res);
        if (payload.oldUrl !== payload.url) {
          router.push({
            pathname: `/ProjectManage/ProjectEdit/${payload.url}`,
          })
        }
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

    * deleteProject({payload}, {call, put}) {

      const {url} = payload;
      const r = yield call(DeleteProject, payload)


      if (r.ret) {
        message.success("刪除成功");
        const r2 = yield call(getProjects, payload);
        if (r2.ret) {
          router.push({
            pathname: `/ProjectManage/ProjectList`,
          })
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
    updateProjectInsert(state, action) {

      return {
        ...state,
        ProjectInsert: {
          ...state.ProjectInsert,
          articles: action.payload,
        }
      };
    },
    updateProjectList(state, action) {
      const {ProjectList} = state;
      return {
        ...state,
        ProjectList: {
          ...ProjectList,
          tableData: action.payload,
        }
      };
    },
    updateProjectEdit(state, action) {

      const {res} = action.payload;
      return {
        ...state,
        ProjectEdit: {
          name: res.Name,
          url: res.Url,
          toc: res.Toc,
          frame: res.Frame,
          articles: res.Articles,
          logoUrl: res.Logo_url,
          description: res.Description,
          isPublic: res.Is_public ? "true" : "false",
        }
      };
    },
  },
};
