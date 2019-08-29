export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin'],
    routes: [
      // dashboard
      { path: '/', redirect: '/ArticleManage/ArticleList' },
      {
        path: '/ArticleManage',
        name: 'ArticleManage',
        icon: 'dashboard',
        authority: ['admin'],
        routes: [
          {
            path: '/ArticleManage/ArticleList',
            name: 'ArticleList',
            component: './ArticleManage/ArticleList',
          },
          {
            path: '/ArticleManage/ArticleInsert',
            name: 'ArticleInsert',
            component: './ArticleManage/ArticleInsert',
          },
          {
            path: '/ArticleManage/ArticleEdit/:url',
            //name: 'Edit',
            component: './ArticleManage/ArticleEdit',
          },
        
        ],
      },
      {
        path: '/TopicManage',
        name: 'TopicManage',
        icon: 'dashboard',
        authority: ['admin'],
        routes: [
          {
            path: '/TopicManage/TopicList',
            name: 'TopicList',
            component: './TopicManage/TopicList',
          },
          {
            path: '/TopicManage/TopicInsert',
            name: 'TopicInsert',
            component: './TopicManage/TopicInsert',
          },
          {
            path: '/TopicManage/TopicEdit/:url',
            //name: 'Edit',
            component: './TopicManage/TopicEdit',
          },
        
        ],
      },
      {
        path: '/ProjectManage',
        name: 'ProjectManage',
        icon: 'dashboard',
        authority: ['admin'],
        routes: [
          {
            path: '/ProjectManage/ProjectList',
            name: 'ProjectList',
            component: './ProjectManage/ProjectList',
          },
          {
            path: '/ProjectManage/ProjectInsert',
            name: 'ProjectInsert',
            component: './ProjectManage/ProjectInsert',
          },
          {
            path: '/ProjectManage/ProjectEdit/:url',
            //name: 'Edit',
            component: './ProjectManage/ProjectEdit',
          },
    
        ],
      },
      {
        path: '/Tools',
        name: 'Tools',
        icon: 'dashboard',
        authority: ['admin'],
        component: './toolsManage/tools',
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];