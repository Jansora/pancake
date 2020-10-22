/*
* @file Banner.jsx
* @description〈一句话功能简述〉
* @author Jansora
* @date 2020-04-15 17:55
*/
import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: ${props => props.top ? props.top : "0"};
  left: ${props => props.left ? props.left : "0"};
  height: 230px;
  width: 400px;
  color: white;
  h1 {
    color: white;
    font-size: 1.6rem;
  }
  p{
   word-break: break-word;
   //margin-bottom: 20px;
   margin: 16px 0 40px;
  }
  footer {
    display: flex;
    align-items: center;
    >a {
      margin-right: 20px !important;
    }
  }
`
const Banner = (props) => {

  return (
    <Wrapper {...props}/>
  )
}

export default Banner;
