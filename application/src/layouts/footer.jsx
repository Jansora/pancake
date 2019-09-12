import React from 'react';
import {Divider, Grid} from "@material-ui/core";
import {FooterWrapper, Backup, FooterContent} from "../styles";
import {Link} from "react-router-dom";

import {Content} from "../styles";

const Footer = () => {
  

    return (

        <FooterWrapper>
            <FooterContent>
                <Grid container justify={'space-around'} component='div' style={{height: '100%'}}>
                    <Grid component='div' item xs={4}>
                        <Content style={{justifyContent: 'flex-left'}}>
                            <h1>关于本站</h1>
                            <p>前台：React + Material Design</p>
                            <p>后台：Ant Design Pro Version4</p>
                            <p>后端：Golang + Gin + Tengine</p>
                            <p>本站源码已开源，详见
                                <a
                                    style={{marginLeft: 7}}
                                    target='_blank' rel='noopener noreferrer' href='https://github.com/Jansora/pancake'>
                                    Github
                                </a>
                            </p>
                        </Content>
                    </Grid>
                    <Grid component='div' item xs={4}
                          style={{
                              // marginTop: 48, marginBottom: 48,
                              borderLeft: '1px solid white',borderRight: '1px solid white'
                          }}>
                        <Content>
                            <h1 > 座右铭</h1>
                            <p>芝兰生于深谷，不以无人而不芳</p>
                            <p>君子修身养德，不以穷困而改志</p>
                        </Content>

                    </Grid>
                    <Grid component='div' item xs={4}>
                        <Content>
                            <h1>版权说明</h1>
                            <p>本站所有博文，专栏，项目，本人拥有最终解释权</p>
                            <p>非商业转载请注明出处(本站URL地址).</p>
                        </Content>
                    </Grid>
                </Grid>
            </FooterContent>
            <Backup>
                <Link to={'/'}>服务条款</Link>
                <Divider component='div' orientation='vertical' style={{background: "white", height: 20, margin: "0 40px"}}/>
                <Link to={'/'}>隐私权</Link>
                <Divider component='div' orientation='vertical' style={{background: "white", height: 20, margin: "0 40px"}}/>
                <span>© 2017-2019</span>
                <a
                    style={{margin: '0 10px'}}
                    target='_blank' rel='noopener noreferrer' href='https://zhangyangyuan.com'>
                    Jansora
                </a>
                <span>版权所有</span>
                <Divider component='div' orientation='vertical' style={{background: "white", height: 20, margin: "0 40px"}}/>
                <a target='_blank' rel='noopener noreferrer' href="http://www.beian.miit.gov.cn">豫ICP备17022883号</a>
            </Backup>

        </FooterWrapper>

    );
  
}

export default Footer;