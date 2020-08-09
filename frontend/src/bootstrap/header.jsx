/*
* @file header.jsx
* @author jansora
* @date 2020/2/20
*/


import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Dropdown, Header as HeaderWrapper, Icon} from "semantic-ui-react";

const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-top: 30px;
  * {
    color: white !important;
  }
  

  >div:first-child {
    float: left;
    margin-left: 5%;
    a {
      font-size: 20px !important;
    }
  }
  >div:last-child{
    float: right;
    margin-right: 5%;
    a {
      margin: 0 10px;
    }
  }
`
const Header = () => {

    return (
        <Wrapper>
            <div>
                <HeaderWrapper as={Link} to="/">Jansora</HeaderWrapper>
            </div>
            <div>
                <Dropdown
                    trigger={<Icon name="weixin" />}
                    icon={null}
                    pointing='top right'
                >
                    <Dropdown.Menu>
                      <img src="https://cdn.zhangyangyuan.com/homepage/wechat.jpg"
                           alt={'Wechat'} style={{width:200, height:200}}/>
                    </Dropdown.Menu>
                </Dropdown>

                <a target="_blank" href="https://github.com/Jansora" rel="noopener noreferrer" >
                    <Icon name="github" /></a>
            </div>
        </Wrapper>
    )
}

export default Header;
