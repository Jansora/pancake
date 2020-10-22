import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";

import localRouter from "./pages/index";

const routes = localRouter.routes.map(route => route.path);

const Scroll = withRouter((props) => {
  const {history, location} = props;
  const [scroll, setScroll] = React.useState(false); // 滚动状态


  const wheel = (event) => {
    // 等待滚动结束 && 设置更新状态
    let index = routes.indexOf(location.pathname) !== -1 ? routes.indexOf(location.pathname) : 0;
    if(scroll) return; else setScroll(true) || setTimeout(() => setScroll(false), 1000);

    // 鼠标向下滑动时, 将第一个元素移到最后, 反之将最后一个元素移至第一.
    event.deltaY > 0 ? index += 1 :  index -= 1;

    if(index < 0 || index >= routes.length)
      return;

    // 更新路由
    history.push(routes[index]);
  };

  useEffect(() => {
    document.body.addEventListener('wheel', wheel);
    return () => document.body.removeEventListener('wheel', wheel);
  });

  return  null;

});

export default Scroll;
