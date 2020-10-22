/*
* @file header.jsx
* @author jansora
* @date 2020/2/4
*/


/*
* @file header.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2020-02-04 10:21
*/

import styled from "styled-components";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  //width: 100vw;
  //background: white;
  z-index: 1000;
  background: ${props => props.bootstrap ? "none" : "white" };
  height: ${props => props.bootstrap ? "100px" : "var(--header-height)" };
  width: ${props => props.bootstrap ? "1200px" : "100vw" };
  margin-left: ${props => props.bootstrap ? "calc((100vw - 1200px) / 2)" : "0" };
  //margin: 0 auto;
  padding: 0 16px;
  box-shadow: ${props => props.bootstrap ? "none" : "0 0 8px 0 rgba(0,0,0,.1)" };
  line-height: var(--header-height);
  a {
      color: ${props => props.bootstrap ? "white" : "rgba(0,0,0,.87)" };
  }

  >div.left {
    width: 400px;
    height: ${props => props.bootstrap ? "100px" : "var(--header-height)" };
    a.ui.header {
      color: ${props => props.bootstrap ? "white" : "rgba(0,0,0,.87)" };
    }
    line-height: ${props => props.bootstrap ? "100px" : "var(--header-height)" };
     i: hover {
        color: var(--primary-color);
      }
      div.ui.breadcrumb {
        display: inline-block;
        line-height: var(--header-height);
        margin: 0 0 5px 5px !important;
        a{
          color: #363636 !important; 
        }
        div.section.active {
           a{
           color: var(--primary-color) !important;
          }
        }
      }
  }
  >div.middle {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
  }
  >div.right {
    width: 400px;
    a {
      //width: 100px;
    }
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  display: flex;
  align-items: center;
  
  transition: width 1000ms, height 1000ms, margin-left 1000ms;
`;


export const StyledHeaderLeft = styled.div`
  float: left;
 

    
  
    //margin-bottom: 5px !important;
    
  }
`;


export const StyledHeaderRight = styled.div`
  float: right;
  a {
    line-height: 50px;
  }
  i {
  font-size: 16px !important;
    color: var(--primary-color);
  }
  span.ant-avatar.ant-avatar-circle{
    background: var(--primary-color);
    margin-top: -4px;
    span.ant-avatar-string {
        color: white;
    }
  }
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


