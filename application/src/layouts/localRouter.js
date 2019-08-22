import Pages from './../pages'

import Empty from '../pages/empty';

const basicUrl = '/';
const urls = {
  posts: "p",
  post: "p/:url",
  topics: "topic",
  topic: "topic/:url",
  projects: "project",
  project: "project/:url",
};
const routes = [
  {
    path: basicUrl + urls.posts, component: Pages.Posts, exact: true,
  },
  {
    path: basicUrl + urls.post, component: Pages.Post, exact: false,
  },
  {
    path: basicUrl + urls.topics, component: Pages.Topics, exact: false,
  },
  {
    path: basicUrl + urls.topic, component: Pages.Topic, exact: false,
  },
  {
    path: basicUrl + urls.projects, component: Pages.Projects, exact: false,
  },
  {
    path: basicUrl + urls.project, component: Pages.Project, exact: false,
  },
];

const redirects = [
    {
        from: basicUrl , to: '/p', exact: true,
    },
];

const container = Empty;

const localRouter = {
  routes,
  redirects,
  container,
};
export default localRouter;

