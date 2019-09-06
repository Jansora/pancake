import {combineReducers} from 'redux';

export const initApp = {
 
};
export const initBreadcrumb = []; // 面包屑导航

export const initMessage = {
  show: false,
  type: 'success',
  content: '',
}; // 面包屑导航


const app = (state = initApp, action) => action.type === 'app' ? { ...state, ...action.payload} : state;
const breadcrumb = (state = initBreadcrumb, action) => action.type === 'breadcrumb' ? action.payload : state;
const message = (state = initMessage, action) => action.type === 'message' ? action.payload : state;

const reducers = combineReducers({
  app, breadcrumb, message
});
export default reducers;