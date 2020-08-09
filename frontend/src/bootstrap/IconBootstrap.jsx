/*
* @file icons.jsx
* @description〈一句话功能简述〉
* @author 18044846
* @date 2020-04-21 15:48
*/
import React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import localRouter from "./pages";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 20px;
  height: 86px;
  top: calc(50vh - 43px);
  //top: 0;
  bottom: 0;
  right: 20px;
  z-index: 1000;
`
const Icon = styled(NavLink)`
  display: inline-block;
  width: 6px;
  height: 6px;
  background: white;
  margin: 5px 0;
  border-radius: 3px;
  &:hover {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    margin: 4px 0;
  }
  &.active {
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background: var(--primary-color);
  }
  transition: all 500ms;
`
const IconBootstrap = () => {

  return (
    <Wrapper>
      {
        localRouter.routes.map(route => <Icon to={route.path} exact title={route.description} />)
      }
    </Wrapper>
  )
}
export default IconBootstrap;
