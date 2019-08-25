import React from 'react';
import {Left, Right} from "../styles/header";

import {Icon} from 'react-fa';
import {NavLink} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';


import Logo from "../logo.png"

import connect from "react-redux/es/connect/connect";

import Breadcrumbs from '@material-ui/core/Breadcrumbs';


const Header = (props) => {

  const {breadcrumb} =props;
  return (
    <React.Fragment>
      <Left>
        <Breadcrumbs separator="›" aria-label="breadcrumb" component='div'>
          <NavLink to={'/'}>
            <img src={Logo} alt='logo'/>
          </NavLink>
          {
            breadcrumb.map( e => <NavLink to={e.label} key={e.label}>{e.value} </NavLink>)
          }
        </Breadcrumbs>
      </Left>
      <Right>
          <Tooltip title="个人主页">
              <a target='_blank' rel='noopener noreferrer' href='https://zhangyangyuan.com'>
                  <Icon name="home"/>
              </a>
          </Tooltip>
          <Tooltip title="电子邮箱">
              <a target='_blank' rel='noopener noreferrer' href='mailto:zhangyue1936@gmail.com'>
                  <Icon name="at"/>
              </a>
          </Tooltip>
          <Tooltip title="微信">
              <a target='_blank' rel='noopener noreferrer' href='https://weixin.qq.com'>
                  <Icon name="weixin"/>
              </a>
          </Tooltip>
          <Tooltip title="Facebook">
              <a target='_blank' rel='noopener noreferrer' href='https://www.facebook.com/Jansoracom'>
                  <Icon name="facebook-square"/>
              </a>
          </Tooltip>
          <Tooltip title="Twitter">
              <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/_Jansora'>
                  <Icon name="twitter-square"/>
              </a>
          </Tooltip>
          <Tooltip title="Github">
              <a target='_blank' rel='noopener noreferrer' href='https://github.com/Jansora'>
                  <Icon name="github"/>
              </a>
          </Tooltip>
          <Tooltip title="Gitter">
              <a target='_blank' rel='noopener noreferrer' href='https://gitter.im/Jansora/community'>
                  <Icon name="comments"/>
              </a>
          </Tooltip>





      </Right>

    </React.Fragment>


  )



};

const mapStateToProps = state => ({
  breadcrumb: state.breadcrumb,
});
export default connect(
  mapStateToProps,
)(Header);




