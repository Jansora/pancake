/*
* @file header.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2020-12-05 10:21
*/

import styled from "styled-components";

export const StyledAside = styled.nav`
  position: fixed;
  top: calc(var(--header-height) + 2px);
  
  display: flex;
  flex-direction: column;
  background: white;
  z-index: 1;
  width: var(--header-width);
  height: calc(100vh - var(--header-height) - 2px);
  
  box-shadow: 0 0 6px 0 rgba(0,0,0,.1);

  >label {
    display: block;
    height: 36px;

    color: rgba(0,0,0,.47);
    padding: 10px 8px 5px 13px;

    
    font-size: 13px;
    user-select:none;
    line-height: 21px;
  }
  >a {
      padding: 0 0 0 9px;
      //margin-right: 10px;
      user-select: none;
      line-height: var(--header-height);
      height: calc(var(--header-height) + 0px);
      overflow: hidden;
      i {
        font-size: 20px;
        margin: 0 12px 0 5px;
      }
      span {
      //display: inline-block;
      //      height: var(--header-height);
      //padding-bottom: 10px;

      }
      display: flex;
      
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--active-backgroud-color);
  }
  >a:hover {
    box-shadow: none;
    //border-color: #1b1c1d;
    font-weight: 700;
    background-color: var(--active-backgroud-color);
    border-right-width: 2px;
    border-right-style: solid;
    border-right-color: var(--active-color);
    
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--active-backgroud-color);
  }
  >a.active {
    box-shadow: none;
    //border-color: #1b1c1d;
    font-weight: 700;
    background-color: var(--active-backgroud-color);

    border-right-width: 2px;
    border-right-style: solid;
    border-right-color: var(--primary-color);
    //transition: border-bottom 500ms;
  }

  &:hover {
    width: var(--active-header-width);
    img {
      width: calc(var(--active-header-width) - 12px );
    }
  }
  div.ui.divider {
    margin: 5px 0;
  }
  transition: width 500ms;
`;

