/*
* @file theme.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2019-12-17 10:39
*/
import React, {useContext, useEffect} from 'react';
import {THEME} from "../../constants";
import {GlobalStore} from "../../store/global";

const ToggleTheme = () => {

  const { theme } = useContext(GlobalStore);

  useEffect(() => {
    document.body.classList.forEach(
      cur => document.body.classList.remove([cur]))

    document.body.classList.add(theme);
    localStorage.setItem(THEME, theme)
  }, [theme]);

  return null
}
export default ToggleTheme;
