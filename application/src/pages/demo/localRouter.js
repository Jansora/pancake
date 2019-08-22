import Main from './main';

import Empty from '../empty';

const basicUrl = '/';

const routes = [
  {
    path: basicUrl, component: Main, label: "discover", exact: false,
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

