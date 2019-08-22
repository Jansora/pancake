import Main from './main';

import Empty from '../empty';
import {Topic} from "../topic";

const basicUrl = '/topic';
const topic =  "/:url";
const routes = [
  {
    path: basicUrl, component: Main, exact: true,
  },
  {
    path: basicUrl + topic, component: Topic, exact: true,
  },
];

const redirects = [];

const container = Empty;

const localRouter = {
  routes,
  redirects,
  container,
};
export default localRouter;

