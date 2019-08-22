
import * as types from '../../constants/ActionTypes';

let initState = {
  loading: true,
  loadingText:"正在初始化...",
  comment:[],
};

export const post = (state = initState, action) => {
  switch (action.type) {
    case types.UPDATE_POST:
      return {
        ...state,
        ...action.e
      };
    default:
      return state
  }
};

