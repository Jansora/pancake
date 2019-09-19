/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';
import React, {useEffect, useState} from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { isAntDesignPro } from '@/utils/utils';
import logo from '../assets/logo.svg';
import styles from './BasicLayout.less'

import { Tabs , message} from 'antd';

const { TabPane } = Tabs;


/**
 * use Authorized check all menu item
 */

const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });

const footerRender = (_, defaultDom) => {
  if (!isAntDesignPro()) {
    return defaultDom;
  }

  return (
    <>
      {defaultDom}
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center',
        }}
      >
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};


const BasicLayout = props => {
  const { dispatch, children, settings } = props;
  /**
   * constructor
   */

    // tab = {path: '/', name: 'aaa'}
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('');

  // 把所有重定向的路由放到这里过滤掉，不展示在tab页里面
  const filters = ['/'];
  useEffect(()=>{
    const path = props.location.pathname;
    const matchTab = tabs.filter(tab => tab.path === path);
    // console.log(matchTab)
    if(matchTab.length > 0){
      setActiveTab(matchTab[0].path)
    } else if (filters.indexOf(path) === -1){
      const label = `menu${path.split('/').join('.')}`;
      const name = formatMessage({
        id: label,
        defaultMessage: label,
      })
      setTabs(tabs.concat({path, name}))
    }
  }, [tabs, props.location.pathname]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  const onEdit = (path, action) => {
    if(action === 'remove') {
      if(tabs.length === 1) {
        return message.warn("至少要有一个Tab页")
      }
      const matchTab = tabs.filter(tab => tab.path !== path);
      setTabs(matchTab)
      if(activeTab === path) {
        router.push(matchTab[0].path)
      }
    }
  }
  console.log(props)
  return (
    <>
      <ProLayout
        className={styles.TabWrapper}
        logo={logo}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
              defaultMessage: 'Home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={footerRender}
        menuDataRender={menuDataRender}
        formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...props}
        {...settings}
      >
        <Tabs
          hideAdd
          type="editable-card"
          className={styles.tabsClass}
          // onEdit={{}}
          activeKey={activeTab}
          onEdit={onEdit}
          // onEdit={(a,b) => console.log(a,b)}
        >
          {
            tabs.map(tab => {
              return <TabPane tab={<Link to={tab.path}>{tab.name}</Link>} key={tab.path} >
                {tab.path === children.props.location.pathname && children}
              </TabPane>
            })
          }
        </Tabs>

      </ProLayout>

    </>
  );
};
// @connect(({  }) => ({
//
// }))

export default connect(({ global, settings, dashboardMonitor, loading }) => ({
  collapsed: global.collapsed,
  settings,
  dashboardMonitor,
  loading: loading.models.dashboardMonitor,
}))(BasicLayout);
