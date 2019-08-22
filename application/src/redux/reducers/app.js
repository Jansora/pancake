
import * as types from '../../constants/ActionTypes';



const state = new Date().getTime();

let initState = {
  loading: false,
  loadingText:"正在初始化...",
  progressBar: 0,
  loginStatus: false,
  state,
  loginUrl: `https://github.com/login/oauth/authorize?client_id=00ca09e946ecd96736c9&scope=user:email&state=${state}`,
  user: {
    name: "",
    avatar: "",
    url: "",
  }
};

export const app = (state = initState, action) => {
  // console.log(...action.e);
  switch (action.type) {
    case types.UPDATE_APP:
      return {
        ...state,
        ...action.e
      };
    default:
      return state
  }
};

