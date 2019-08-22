
import * as types from '../../constants/ActionTypes';

let initState = {
  loading: false,
  loadingText:"正在初始化...",
};

export const progress = (state = initState, action) => {
  switch (action.type) {
    case types.UPDATE_PROGRESS:
      return {
        ...state,
        ...action.e
      };
    default:
      return state
  }
};

