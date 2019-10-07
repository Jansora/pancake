import React from 'react';
import {Divider} from "@material-ui/core";
import {FooterWrapper} from "../styles";
import {Link} from "react-router-dom";


const Footer = () => {
  

    return (
        <FooterWrapper>

                <Link to={'/post/Terms-of-Service'}>服务条款</Link>
                <Divider component='div' orientation='vertical' style={{background: "white", height: 20, margin: "0 40px"}}/>
                <Link to={'/post/privacy'}>隐私权</Link>
                <Divider component='div' orientation='vertical' style={{background: "white", height: 20, margin: "0 40px"}}/>
                <Link to={'/post/version'}>版本日志</Link>
                <Divider component='div' orientation='vertical' style={{background: "white", height: 20, margin: "0 40px"}}/>
                <span>© 2017-2019</span>
                <a
                    style={{margin: '0 10px'}}
                    target='_blank' rel='noopener noreferrer' href='https://zhangyangyuan.com'>
                    Jansora
                </a>
                <span>版权所有, 非商业转载请注明出处。</span>
                <Divider component='div' orientation='vertical' style={{background: "white", height: 20, margin: "0 40px"}}/>
                <a target='_blank' rel='noopener noreferrer' href="http://www.beian.miit.gov.cn">豫ICP备17022883号</a>


        </FooterWrapper>

    );
  
}

export default Footer;