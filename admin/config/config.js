import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/index',
      //   webpackChunkName: true,
      //   level: 3,
      // },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
}

export default {
  plugins,
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      // exact: true,
      component: '../layouts/UserLayout',
      routes: [
        { path: '/user', redirect: '/user/login' },
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            // { path: '/', redirect: '/welcome' },
            { path: '/', redirect: '/ArticleManage' },
            {
              path: '/ArticleManage',
              name: 'ArticleManage',
              icon: 'dashboard',
              routes: [
                { path: '/ArticleManage', redirect: '/ArticleManage/ArticleList' },
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
                  // name: 'Edit',
                  component: './ProjectManage/ProjectEdit',
                },

              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },

    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
  proxy: {
    '/Golang/': {
      target: 'http://jansora.com:8080/',
      changeOrigin: true,
    },
  },
};
