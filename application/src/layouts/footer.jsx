import React from 'react';
import {Divider} from "@material-ui/core";
import {FooterWrapper} from "../styles";
import {useMediaQuery} from "react-responsive";
import {desktopStyle} from "../utils/constants";


const Footer = () => {

  const isDesktop = useMediaQuery({query: desktopStyle});

    return (
        <FooterWrapper>
          {
            isDesktop && <>
              <a target='_blank' rel='noopener noreferrer' href={'/post/Terms-of-Service'}>服务条款</a>
              <Divider component='div' orientation='vertical' style={{background: "white", height: 20, margin: "0 40px"}}/>
              <a target='_blank' rel='noopener noreferrer' href={'/post/privacy'}>隐私权</a>
              <Divider component='div' orientation='vertical' style={{background: "white", height: 20, margin: "0 40px"}}/>
              <a target='_blank' rel='noopener noreferrer' href={'/post/version'}>版本日志</a>
              <Divider component='div' orientation='vertical' style={{background: "white", height: 20, margin: "0 40px"}}/>
            </>
          }
            <span>本站已开源，详见</span>
            <a
                style={{margin: '0 10px'}}
                target='_blank' rel='noopener noreferrer' href='https://github.com/Jansora/pancake'
            >
               Github
            </a>
          {
            isDesktop && <>
              <Divider component='div' orientation='vertical' style={{background: "white", height: 20, margin: "0 40px"}}/>
              <a target='_blank' rel='noopener noreferrer' href="http://www.beian.miit.gov.cn">豫ICP备17022883号</a>

            </>
          }

        </FooterWrapper>

    );
  
}

export default Footer;