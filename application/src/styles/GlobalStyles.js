import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body{
     
      height: 100vh;
      width: 100vw;
      margin: 0;
      //width: 100%;
      // overflow: hidden;
      scroll-behavior: smooth;
      color: #595959;
      font-family: Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
      a{
        color: var(--primary-color);
        text-decoration: none !important;
      }
      a:hover, a:checked, a:active{
        color: var(--primary-active-color);
      }
      ::selection {
        background-color: var(--primary-color);
        color: white;
      }
    }

    ::-webkit-scrollbar {
      width: 6px;
      height: 5px;
      border: 3px;
    }
    ::-webkit-scrollbar-thumb {
      width:6px;
      background-color: var(--primary-color) !important;
      -webkit-border-radius: 2px;
      outline: 1px solid  var(--primary-color);
      outline-offset: -2px;
      border: 3px solid  var(--primary-color);
    }
    ::-webkit-scrollbar-track {
      display: none;
    }

    body::-webkit-scrollbar {
        //display: none;

    }

`;

export const GlobalColors = createGlobalStyle`

  body{
    --primary-color: #3f51b5;
    //--primary-active-color: #6435C9;
    --primary-active-color: #5FA95E;
  }

`;
