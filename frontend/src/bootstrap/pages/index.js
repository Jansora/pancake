import Home from './Home';
import Post from "./Post";
import Topic from "./Topic";
import Project from "./Project";

export const basicUrl = '/bootstrap';

const routes = [
  {path: basicUrl + '', component: Home, exact: false, description: '主页',},
  {path: basicUrl + '/post', component: Post, exact: false, description: '博客',},
  {path: basicUrl + '/topic', component: Topic, exact: false, description: '专栏',},
  {path: basicUrl + '/project', component: Project, exact: false, description: '项目',},

    ]

;



const redirects = [
  {
    from: basicUrl, to: basicUrl + 'Home', exact: true,
  }
]


;

const localRouter = {
  routes,
  redirects,
  Home,
};
export default localRouter;

