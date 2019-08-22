import Main from './main';

import Empty from '../empty';
import {Project} from "../project";

const basicUrl = '/project';
const project =  "/:url";
const routes = [
  {
    path: basicUrl, component: Main, exact: true,
  },
  {
    path: basicUrl + project, component: Project, exact: true,
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

