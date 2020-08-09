/*
* @file index.jsx
* @description〈一句话功能简述〉
* @author Jansora
* @date 2020-08-02 17:08
*/
import React from 'react';


import styled from "styled-components";
import SetTitle from "../../../components/hooks/SetTitle";

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  margin: 0 auto;
  overflow: hidden;
  > i {
    position: fixed;
    cursor: pointer;
    right: 10px;
    top: 60px;
  }
  iframe {
    width: 100%;
    height: calc(100% - 50px);
    // margin-top: 25px;
    overflow:hidden;
  }
`


const Playground = () => {


  SetTitle("代码练习场")


  return (

      <Wrapper>
          <iframe src={"https://playground.jansora.com"} allowFullScreen={true} frameBorder={0} scrolling="no"/>
      </Wrapper>

  )
}
export default Playground;
