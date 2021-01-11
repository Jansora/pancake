/*
* @file header.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2020-12-05 10:21
*/

import styled from "styled-components";

export const StyledNavBar = styled.nav`
  position: fixed;
  background: white;
  display: flex;
  flex-direction: column;

  height: 100vh;

  width: ${props => props.activeNav ? "var(--active-header-width)" : "var(--header-width)"} ;


  box-shadow: 0 0 8px 0 rgba(0,0,0,.1);

  div.logo {
    margin: 5px;
    display: flex;
    align-items: center;
    flex-direction: column;

    img {
      width: calc(var(--header-width) - 12px );
    }
  }
  >a {
      padding: 0 0 0 9px;
      user-select: none;
      line-height: var(--header-height);
      height: calc(var(--header-height) + 0px);
      overflow: hidden;
      i {
        font-size: 20px;
        margin: 0 12px 0 5px;
      }
      display: flex;
      
      //border-bottom-width: 1px;
      //border-bottom-style: solid;
      //border-bottom-color: var(--active-backgroud-color);
  }
  >a:hover {
    box-shadow: none;
    font-weight: 700;
    background-color: var(--active-backgroud-color);
    border-right-width: 2px;
    border-right-style: solid;
    border-right-color: var(--active-color);
    
    //border-bottom-width: 1px;
    //border-bottom-style: solid;
    //border-bottom-color: var(--active-backgroud-color);
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

  //&:hover {
  //  width: var(--active-header-width);
  //  img {
  //    width: calc(var(--active-header-width) - 12px );
  //  }
  //}
  div.ui.divider {
    margin: 5px 0;
  }
  transition: width 500ms;
`;


export const StyledProductsWrapper = styled.div`
  width: 320px;
  padding: 16px;
  
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledProductsItem = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    height: 92px;
    width: 92px;
    margin-top: 4px;
    transition: margin-top 218ms ease-in-out;
    a {
    
        display: flex;
        cursor: pointer;

          height: 50px;
          width: 50px;
          i {
            font-size: 40px;
          } 
    }
    span {
        margin-bottom: 10px;
    }
    &:hover {
      margin-top: 0;
    }
    
`;


