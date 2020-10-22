/*
* @file header.jsx
* @author jansora
* @date 2020/2/4
*/


import React from "react";
import {StyledHeader} from "../../styled/header";
import {Header as Head, Icon} from "semantic-ui-react";
import {Divider} from "antd";
import Theme from "./theme";
import User from "./user";
import Add from "./add";
import Help from "./help";
import {Link, NavLink} from "react-router-dom";
import GetTitle from "../../components/hooks/GetTitle";
import AdminLoginStatus from "../../components/hooks/AdminLoginStatus";
import Links from "./links";


const Header = (props) => {


    const title = GetTitle();
    const loginStatus = AdminLoginStatus();
    const {bootstrap} = props;

    return (
        <StyledHeader bootstrap={bootstrap}>
            <div className="left">
              {
                !bootstrap &&               <>
                    <Link to={'/'}><Icon name="home"/></Link>
                    <Divider type="vertical" style={{margin: '0 10px'}}/>
                    <NavLink to={"/post"} title={"博客"}>
                        <Icon name="blogger"/>
                    </NavLink>
                    <Divider type="vertical" style={{margin: '0 10px'}}/>
                    <NavLink to={"/topic"} title={"专栏"}><Icon name="book"/>
                    </NavLink>
                    <Divider type="vertical" style={{margin: '0 10px'}}/>
                    <NavLink to={"/project"} title={"项目"}>
                        <Icon name="paper plane"/>
                    </NavLink>
                    <Divider type="vertical" style={{margin: '0 10px'}}/>
                    <NavLink to={"/feedback"} title={"留言板"}>
                        <Icon name="comment"/>
                    </NavLink>
                </>
              }


            </div>
            <div className="middle">
                {
                    !bootstrap &&
                    <Head>{title}</Head>
                }
            </div>
            <div className="right">


              {
                !bootstrap && <React.Fragment>
                  <Divider type="vertical" style={{margin: '0 16px 0 50px'}}/>
                  {
                    loginStatus && <React.Fragment>
                      <Add/>
                      <Divider type="vertical" style={{margin: '0 16px'}}/>
                    </React.Fragment>
                  }
                  <Theme/>
                  <Divider type="vertical" style={{margin: '0 16px'}}/>
                  <Links/>
                  <Divider type="vertical" style={{margin: '0 16px'}}/>
                  <Help/>

                  <Divider type="vertical" style={{margin: '0 16px'}}/>
                  <User/>
                </React.Fragment>
              }

            </div>
        </StyledHeader>
    )
}

export default Header;
