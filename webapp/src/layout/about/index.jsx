import React from 'react';
import {Aside, Head, Label, LinkItem} from "../../components/styled/frameworks";
import {Divider, Icon} from "semantic-ui-react";
import GetPath from "../../components/hooks/GetPath";
import {Route, Switch} from "react-router-dom";
import UserInfo from "./userinfo/index";
import LoginStatus from "../../components/hooks/LoginStatus";
import GetCurrentUser from "../../components/hooks/GetCurrentUser";
import {StyledDescription} from "../../components/styled/common";
import Theme from "./Theme";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/06 11:40:10
 */
const About = (props) => {

  // const adminStatus = AdminLoginStatus()
  const status = LoginStatus();
  const user = GetCurrentUser();

  return <React.Fragment>
    <Head>
      <h3>关于</h3>
    </Head>
    <Aside>
      <Label>个性化</Label>
      <LinkItem to="/about/theme" className={GetPath() === "/about/theme" ? 'active' : ''}><Icon name="gem" />   主题 </LinkItem>

      <Label>服务信息</Label>
      <LinkItem to="/about/privacy" className={GetPath() === "/about/privacy" ? 'active' : ''}><Icon name="gem" />   隐私权 </LinkItem>
      <LinkItem to="/about/Terms-of-Service" className={GetPath() === "/about/Terms-of-Service" ? 'active' : ''}><Icon name="react" />   服务条款 </LinkItem>
      <Divider />
      <Label>关于</Label>

      <LinkItem to="/about/website" className={GetPath() === "/about/website" ? 'active' : ''}><Icon name="react" />   关于本站 </LinkItem>
      <LinkItem to="/about/author" className={GetPath() === "/about/author" ? 'active' : ''}><Icon name="gem" />   关于作者 </LinkItem>
      <Divider />

      <Label>用户信息</Label>
      {
        !status ? <React.Fragment>
              <LinkItem to="/about/user/signin" className={GetPath() === "/about/user/signin" ? 'active' : ''}><Icon name="sign in" />   账户登录</LinkItem>
              <LinkItem to="/about/user/oauth" className={GetPath() === "/about/user/oauth" ? 'active' : ''}><Icon name="sign in" />   第三方账户登录</LinkItem>
        </React.Fragment> :
            <LinkItem to="/about/user/current" className={GetPath() === "/about/user/current" ? 'active' : ''}>
              <Icon name="circle" color="green" /> {user.alias} <StyledDescription>已登录</StyledDescription>
            </LinkItem>

      }

    </Aside>


      <Switch>
        <Route path="/about/user" component={UserInfo} exact={false}/>
        <Route path="/about/theme" component={Theme} exact={false}/>


      </Switch>
  </React.Fragment>;
}

export default About;
