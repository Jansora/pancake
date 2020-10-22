/*
* @file Root.jsx
* @author jansora
* @date 2020/2/20
*/


import React from "react";
import styled from "styled-components";
import Header from "./header";
import Content from "./Content";

const Wrapper = styled.main`
width: 100vw;
height: 100vh;
overflow: hidden;
background-image: url(https://cdn.jansora.com/img/bootstrap.jpg);
background-size: cover;
background-attachment: fixed;
background-position: center;
footer {
    position: fixed;
    text-align: center;
    
    bottom: 0;
    width: 100%;
    padding: 10px 0;
    a {
    color: white;
      }
}
`
const Root = () => {

    return (
        <Wrapper>
            <Header/>
            <Content/>
            <footer><a target='_blank' rel='noopener noreferrer' href="http://www.beian.miit.gov.cn/state/outPortal/loginPortal.action">豫ICP备17022883号</a>	</footer>
        </Wrapper>
    )
}

export default Root;
