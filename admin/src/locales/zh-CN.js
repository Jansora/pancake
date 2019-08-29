import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import pwa from './zh-CN/pwa';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';
export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
  
  
  'menu.ArticleManage': '博客管理',
  'menu.ArticleManage.ArticleList': '博客列表',
  'menu.ArticleManage.ArticleEdit': '博客编辑',
  'menu.ArticleManage.ArticleInsert': '博客插入',
  
  'menu.TopicManage': '话题管理',
  'menu.TopicManage.TopicList': '话题列表',
  'menu.TopicManage.TopicEdit': '话题编辑',
  'menu.TopicManage.TopicInsert': '话题插入',
  
  'menu.ProjectManage': '项目管理',
  'menu.ProjectManage.ProjectList': '项目列表',
  'menu.ProjectManage.ProjectEdit': '项目编辑',
  'menu.ProjectManage.ProjectInsert': '项目插入',
  
  'menu.Tools': "常用工具",
  
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
