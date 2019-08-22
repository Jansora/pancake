
import * as types from '../../constants/ActionTypes';

let initState = {
  loading: true,
  loadingText:"正在初始化...",
};

export const loading = (state = initState, action) => {
  switch (action.type) {
    case types.UPDATE_LOADING:
      return {
        ...state,
        ...action.e
      };
    default:
      return state
  }
};

