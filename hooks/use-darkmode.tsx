/*
* @file useDarkMode.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2020-01-16 15:23
*/
import {useTheme} from "next-themes";

const useDarkMode = () => {
  const { resolvedTheme } = useTheme()
  return resolvedTheme !== "light";
}
export default useDarkMode;
