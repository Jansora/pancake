/*
* @file posts.jsx
* @author jansora
* @date 2020/2/11
*/

import styled from "styled-components";

export const MenuOptions = styled.div`

    //top: 0;
    //position: sticky;
    height: 49px;
    width: 100%;
    background: white;
    display: flex;
    //justify-content: space-around;
    align-items: center;
        //flex-wrap: wrap;
    //z-index: 1000;
    div.ui.dropdown{
      min-width: 120px;
      margin-left: 20px;
    }
    div.ui.input {
          width: 100%;
      flex: 1 1 auto;
    }
    input {

    }
`;

export const StyledLikeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  >span{
    margin-top: 15px;
  }
  
`
