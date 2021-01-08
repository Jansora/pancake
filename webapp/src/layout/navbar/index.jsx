import React from 'react';
import {NavLink} from "react-router-dom";
import {StyledNavBar} from "../../components/styled/navbar";
import {Divider, Icon} from "semantic-ui-react";
import {useResponsive} from 'ahooks';
import GetPath from "../../components/hooks/GetPath";
import LoginStatus from "../../components/hooks/LoginStatus";
import GetCurrentUser from "../../components/hooks/GetCurrentUser";


const NavBar = (props) => {
  const {activeNav, setActiveNav} = props;
  const responsive = useResponsive();

  const loginStatus = LoginStatus();
  const user = GetCurrentUser();

  return <StyledNavBar activeNav={activeNav} responsive={responsive} onMouseEnter={() => setActiveNav(true)}  onMouseLeave={() => setActiveNav(false)}>
    <div className="logo">
      <NavLink to="/"><img src="https://cdn.jansora.com/logo/logo.png" alt="logo"/></NavLink>
    </div>
    {/*<Divider />*/}



    <NavLink to={"/notes"}> <div> <Icon name="globe" /> </div> <>点滴成河 </></NavLink>
    {/*<Divider />*/}
    <NavLink to={"/inspiration"}> <div> <Icon name="medapps" /> </div> 灵光乍现 </NavLink>

    <NavLink to={"/KnowledgeGraph"} ><div> <Icon name="map" /> </div> 知识图谱</NavLink>
    <NavLink to={"/app-store"}> <div> <Icon name="app store ios" /> </div> 应用商店 </NavLink>



    <div style={{flex: "1 1 auto"}} />
    <NavLink to="/about/theme" className={GetPath() === "/about/theme" ? 'active' : ''}>
      <div><Icon name="gem" /></div> 主题色配置
    </NavLink>
    {
      loginStatus ? <NavLink to="/about/user/current" className={GetPath() === "/about/user/current" ? 'active' : ''}>
            <div><Icon name="circle" color="green" /> </div>{user.alias}
          </NavLink> :
          <NavLink to="/about/user/signin" className={GetPath() === "/about/user/login" ? 'active' : ''}>
            <div><Icon name="sign in" /></div> 登录 / 注册
          </NavLink>

    }
    <Divider />
    <a  target='_blank' rel='noopener noreferrer' href="https://cdn.jansora.com/homepage/wechat.jpg">
      <div> <Icon name="weixin" /> </div> 微信
    </a>
    <a  target='_blank' rel='noopener noreferrer' href="https://github.com/Jansora">
      <div> <Icon name="github" /> </div> Github
    </a>


    <a  target='_blank' rel='noopener noreferrer' href="https://beian.miit.gov.cn/">
      <div> <Icon name="address card" /> </div> 豫ICP备17022883号
    </a>


  </StyledNavBar>

}

export default NavBar;
