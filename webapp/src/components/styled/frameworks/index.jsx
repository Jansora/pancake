/*
* @file index.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2020-11-21 23:55
*/

import styled from "styled-components";
import {Link} from "react-router-dom";

const AsideWrapper = styled.aside`
  //width: var(--aside-width);
  width: ${props => props.Display === false ? "0" : "var(--aside-width)"};;
  display: ${props => props.Display === false ? "none" : "flex"};
  height: calc(100% - var(--header-height));
  min-height: calc(100% - var(--header-height));
  position: fixed;
  //padding: 8px 16px;
  box-shadow: 0 0 8px 0 rgba(0,0,0,.1);
  right: ${props => props.right === true ? "0" : "flex"};
  //overflow: scroll;
  //display: flex;
  flex-direction: column;
`
export const Aside = (props) => {
  return <AsideWrapper right={props.right} Display={props.Display} >
    <div style={{overflowY: "auto", padding: "8px 16px 8px 16px"}} {...props} >

    </div>
  </AsideWrapper>
}


export const Item = styled.div`
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
  margin: 1px 0;
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

export const LinkItem = (props) => {
  return <Item  as={Link} {...props} />

}
//
// export const LinkItem = styled(Link)`
//   display: block;
//   height: 33px;
//   padding: 5px 8px;
//   line-height: 21px;
//   cursor: pointer;
//   color: rgba(0,0,0,.67);
//   text-overflow: ellipsis;
//   display: -webkit-box;
//   -webkit-line-clamp: 1;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
//   margin: 1px 0;
//   i {
//     margin-right: 5px;
//   }
//   :hover {
//     color: var(--active-color);
//   }
//   &.active {
//     color: var(--primary-color);
//   }
//   :hover, &.active {
//     background: rgba(0,0,0,.04);
//   }
//
//   div.ui.label {
//     float: right;
//     font-size: 6px;
//     border-radius: 17px;
//     margin: 2px 5px 0 0;
//   }
// `
export const Label = styled.label`
  display: block;
  height: 36px;

  color: rgba(0,0,0,.47);
  padding: 5px 8px 5px 0;

  font-size: 13px;
  user-select:none;
  line-height: 21px;

`

export const SubHead = styled.header`


  z-index: 1;
  padding: 0 10px;
  height: var(--header-height);
  background: white;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: 0 0 8px 0 rgba(0,0,0,.1);
  a {
    margin-right: 10px;
  }
  div.padding {
    flex: 1 1 auto;
  }

`

export const Section = styled.section`
  //margin-left: var(--aside-width);
  //margin-top: 60px;
  //height: 100%;
  margin-right: ${props => props.marginRight === false ? "0" : "var(--aside-width)"};
  margin-left: ${props => props.marginLeft === false ? "0" : "var(--aside-width)"};
    // margin-top: ${props => props.marginTop === false ? "0" : "60px"};;

  padding: 16px;
`



export const FlexPadding = styled.div`
  flex: 1 1 auto;
  `