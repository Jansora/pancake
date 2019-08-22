import Main from './main';

import Empty from '../empty';

const basicUrl = '/project/:url';

const routes = [
  {
    path: basicUrl, component: Main, exact: true,
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

