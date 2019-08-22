import Main from './main';

import Empty from '../empty';

const basicUrl = '/p/:url';

const routes = [
  {
    path: basicUrl, component: Main, exact: false,
  },
];

const redirects = [
];

const container = Empty;

const localRouter = {
  routes,
  redirects,
  container,
};
export default localRouter;

