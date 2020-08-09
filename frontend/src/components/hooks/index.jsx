/*
* @file index.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2019-12-18 15:56
*/
import React from 'react';
import ToggleTheme from "./ToggleTheme";
import AutoLogin from "./AutoLogin";

const Hooks = () => {
  return (
    <React.Fragment>
      <ToggleTheme/>
      <AutoLogin/>
    </React.Fragment>
  )
}
export default Hooks;
