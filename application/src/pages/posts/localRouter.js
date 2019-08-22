import Main from './main';

import Empty from '../empty';

const basicUrl = '/p';

const routes = [
  {
    path: basicUrl, component: Main, exact: true,
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

