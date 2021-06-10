import React from 'react';
import {StyledAside} from "../../components/styled/navbar";
import {Icon} from "semantic-ui-react";
import {useResponsive} from 'ahooks';
import GetPath from "../../components/hooks/GetPath";
import LoginStatus from "../../components/hooks/LoginStatus";
import GetCurrentUser from "../../components/hooks/GetCurrentUser";


const Aside = (props) => {



  const responsive = useResponsive();

  const loginStatus = LoginStatus();
  const user = GetCurrentUser();

  const path = GetPath();






  return <StyledAside responsive={responsive} >
    <a  target='_blank' rel='noopener noreferrer' href="https://cdn.jansora.com/homepage/wechat.jpg">
      <div> <Icon name="weixin" /> </div> 微信
    </a>
    <a  target='_blank' rel='noopener noreferrer' href="https://github.com/Jansora">
      <div> <Icon name="github" /> </div> Github
    </a>


    <a  target='_blank' rel='noopener noreferrer' href="https://beian.miit.gov.cn/">
      <div> <Icon name="address card" /> </div> 豫ICP备17022883号
    </a>




  </StyledAside>

}

export default Aside;
