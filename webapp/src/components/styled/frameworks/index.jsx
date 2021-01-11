/*
* @file index.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2020-11-21 23:55
*/

import styled from "styled-components";
import {Link} from "react-router-dom";

export const Aside = styled.aside`
  //width: var(--aside-width);
  width: ${props => props.Display === false ? "0" : "var(--aside-width)"};;
  display: ${props => props.Display === false ? "none" : "block"};
  height: calc(100% - var(--header-height));
  position: fixed;
  padding: 8px 16px;
  box-shadow: 0 0 8px 0 rgba(0,0,0,.1);
  right: ${props => props.right === true ? "0" : "none"};
  overflow-y: auto;
  //display: flex;
  flex-direction: column;
`

export const Item = styled.div`
  height: 33px;
  padding: 5px 8px;
  line-height: 21px;
  cursor: pointer;
  border-radius: 8px;
    text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow-x: hidden;
    color: rgba(0,0,0,.67);
  i {
      margin-right: 5px;
  }
  :hover {
    color: var(--active-color);
  }
  &.active {
    color: var(--primary-color);
  }
  :hover, &.active {
    background: var(--active-backgroud-color);
  }
  
  
  div.ui.label {
    float: right;
    font-size: 6px;
    border-radius: 17px;
    margin: 2px 5px 0 0;
  }
`

export const LinkItem = styled(Link)`
  display: block;
  height: 33px;
  padding: 5px 8px;
  line-height: 21px;
  cursor: pointer;
    color: rgba(0,0,0,.67);
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
    border-radius: 2px;
  i {
      margin-right: 5px;
  }
  :hover {
    color: var(--active-color);
  }
  &.active {
    color: var(--primary-color);
  }
  :hover, &.active {
    background: rgba(0,0,0,.04);
  }
  
  div.ui.label {
    float: right;
    font-size: 6px;
    border-radius: 17px;
    margin: 2px 5px 0 0;
  }
`
export const Label = styled.label`
  display: block;
  height: 36px;
  
  color: rgba(0,0,0,.47);
  padding: 10px 8px 5px 8px;

  font-size: 13px;
  user-select:none;
  line-height: 21px;

`

export const Head = styled.header`

   position: fixed;
   top: 0;

   height: var(--header-height);

   box-shadow: 0 0 5px 0 rgba(0,0,0,.1);
   


   padding: 0 25px;




    display: flex;
    align-items: center;
    
    h3 {
      margin: 0;
      
      font-size: 16px;
      user-select: none;
    }
    div.ui.input {
      //flex: 1 1 auto;
      width: 230px;
      transition: width 500ms;
    }
    div.ui.input:hover{
      width: 60% !important;
      
    }
    
    background: white;
`

export const Section = styled.section`
   //margin-left: var(--aside-width);
   //margin-top: 60px;
   //height: 100%;
   margin-right: ${props => props.marginRight === false ? "0" : "var(--aside-width)"};
   margin-left: ${props => props.marginLeft === false ? "0" : "var(--aside-width)"};
   // margin-top: ${props => props.marginTop === false ? "0" : "60px"};;

   //padding: 32px;
`
