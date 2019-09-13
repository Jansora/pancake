import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body{
      margin: 0;
      width: 100%;
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
    }

    body::-webkit-scrollbar {
    
    }

`;

export const GlobalColors = createGlobalStyle`

  body{
    --primary-color: #3f51b5;
    //--primary-active-color: #6435C9;
    --primary-active-color: #5FA95E;
  }

`;
