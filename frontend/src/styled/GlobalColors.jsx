/*
* @file GlobalColors.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2020-02-04 10:21
*/
import {createGlobalStyle} from "styled-components";

const GlobalColors = createGlobalStyle`

  body{
    --primary-color: #3f51b5;
    --primary-active-color: #5FA95E;
    --header-height: 48px;
  }

  .red {
    // 整体主题色配置
    --primary-color: #db2828;
    --active-backgroud-color: rgba(219, 40, 40, .08);
    --hover-backgroud-color: rgba(219, 40, 40, .1);
  }
  .orange {
    // 整体主题色配置
    --primary-color: #f2711c;
    --active-backgroud-color: rgba(242, 113, 28, .08);
    --hover-backgroud-color: rgba(242, 113, 28, .1);
  }
  .yellow {
    // 整体主题色配置
    --primary-color: #fbbd08;
    --active-backgroud-color: rgba(251, 189, 8, .08);
    --hover-backgroud-color: rgba(251, 189, 8, .1);
  }
  .olive {
    // 整体主题色配置
    --primary-color: #b5cc18;
    --active-backgroud-color: rgba(181, 204, 24, .08);
    --hover-backgroud-color: rgba(181, 204, 24, .1);
  }
  .green {
    // 整体主题色配置
    --primary-color: #21ba45;
    --active-backgroud-color: rgba(33, 186, 69, .08);
    --hover-backgroud-color: rgba(33, 186, 69, .1);
  }
  .teal {
    // 整体主题色配置
    --primary-color: #00b5ad;
    --active-backgroud-color: rgba(0, 181, 173, .08);
    --hover-backgroud-color: rgba(0, 181, 173, .1);
  }
  .blue {
    // 整体主题色配置
    --primary-color: #2185d0;
    --active-backgroud-color: rgba(33, 133, 208, .08);
    --hover-backgroud-color: rgba(33, 133, 208, .1);
  }
  
  .violet {
    // 整体主题色配置
    --primary-color: #6435c9;
    --active-backgroud-color: rgba(100, 53, 201, .08);
    --hover-backgroud-color: rgba(100, 53, 201, .1);
  }
  .purple {
    // 整体主题色配置
    --primary-color: #a333c8;
    --active-backgroud-color: rgba(163, 51, 200, .08);
    --hover-backgroud-color: rgba(163, 51, 200, .1);
  }
  .pink {
    // 整体主题色配置
    --primary-color: #e03997;
    --active-backgroud-color: rgba(224, 57, 151, .08);
    --hover-backgroud-color: rgba(224, 57, 151, .1);
  }
  .brown {
    // 整体主题色配置
    --primary-color: #a5673f;
    --active-backgroud-color: rgba(165, 103, 63, .08);
    --hover-backgroud-color: rgba(165, 103, 63, .1);
  }
  .grey {
    // 整体主题色配置
    --primary-color: #767676;
    --active-backgroud-color: rgba(118, 118, 118, .08);
    --hover-backgroud-color:rgba(118, 118, 118, .1);
  }

`;
export default GlobalColors;
