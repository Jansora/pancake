import React from 'react';
import {Left, Right} from "../styles/header";

import {Icon} from 'react-fa';
import {NavLink} from "react-router-dom";


import Logo from "../logo.png"

import connect from "react-redux/es/connect/connect";

import Breadcrumbs from '@material-ui/core/Breadcrumbs';


class Header extends React.Component{

    render() {
      const {breadcrumb} = this.props;
      
      return (
        <React.Fragment>
          <Left>
            <Breadcrumbs separator="›" aria-label="breadcrumb" component='div'>
              <NavLink to={'/'} exact>
                <img src={Logo} alt='logo'/>
              </NavLink>
              {
                breadcrumb.map( e => <NavLink to={e.link} exact key={e.link}>{e.label} </NavLink>)
              }
            </Breadcrumbs>
          </Left>
          <Right>
            <a target='_blank' rel='noopener noreferrer' href='mailto:zhangyue1936@gmail.com'> <Icon name="at"/> </a>
            <a target='_blank' rel='noopener noreferrer' href='https://weixin.qq.com'> <Icon name="weixin"/> </a>
            <a target='_blank' rel='noopener noreferrer' href='https://www.facebook.com/Jansoracom'> <Icon
              name="facebook-square"/> </a>
            <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/_Jansora'> <Icon
              name="twitter-square"/> </a>
            <a target='_blank' rel='noopener noreferrer' href='https://github.com/Jansora'> <Icon name="github"/> </a>
          </Right>
    
        </React.Fragment>
  
  
      )
    }


};

const mapStateToProps = state => ({
  breadcrumb: state.breadcrumb,
});
export default connect(
  mapStateToProps,
)(Header);




