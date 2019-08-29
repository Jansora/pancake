import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body{
      margin: 0;
      width: 100%;
      // background: #f5f5f5;
      scroll-behavior: smooth;
      color: #595959;
      font-family: Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
      a{
        color: var(--primary-color);
        text-decoration: none !important;
      }
      a:hover, a:checked, a:active, a.active{
        color: var(--primary-active-color);
      }
      ::selection {
        background-color: var(--primary-color);
        color: white;
      }
    
    }

    ::-webkit-scrollbar {
      // display: none;
      width: 6px;
      height: 5px;
      border: 2px;
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
      // width:6px;
      // background-color: white;
    }

    body::-webkit-scrollbar {
      // display: none;
    }

`;

export const GlobalColors = createGlobalStyle`

  body{
    --primary-color: #3f51b5;
    --primary-hover-color: #6435C9;
    --active-backgroud-color: rgba(33, 186, 69, .231);
    --hover-backgroud-color: rgba(33, 186, 69, .08);
  
    --primary-active-color: #d67c1c; //#A8D736;//
    --primary-width: 1024px;//1300px;//1024px;
    --description-color: #888888;
  
    --primary-color-rgba:  rgba(var(--primary-color), 0.20);
  
    --wrapper-color: #ffffff;
    --background-color: rgba(0, 0, 0, 0.04);
  
    --border-color: #dedede;
  
    --header-height: 50px;
    --header-width: var(--primary-width);
    --content-padding-width: 100px;
  
    --footer-height: 50px;
    --footer-width: 100%;
    --min-footer-width: 1000px;
  }



`;
