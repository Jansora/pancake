import { combineReducers } from 'redux';

export const initApp = {
 
};
export const initBreadcrumb = []; // 面包屑导航

const app = (state = initApp, action) => action.type === 'app' ? { ...state, ...action.payload} : state;
const breadcrumb = (state = initBreadcrumb, action) => action.type === 'breadcrumb' ? action.payload : state;

const reducers = combineReducers({
  app, breadcrumb,
});
export default reducers;