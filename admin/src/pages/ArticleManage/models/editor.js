import queryError from '@/services/error';
import { getTags, InsertArticle } from '@/services/golang';
import {message} from 'antd';

import { getLoginInfo} from "../../../utils/authority";

export default {
  namespace: 'Editor',

  state: {
  },

  effects: {
    *Update({ payload }, { put }) {
        yield put({
          type: 'updateData',
          payload,
        });
    },
  },

  reducers: {
    updateData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

  },
};
