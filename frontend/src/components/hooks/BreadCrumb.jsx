/*
* @file BreadCrumb.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2019-12-26 19:34
*/
import {useContext, useEffect, useState} from 'react';
import {GlobalStore} from "../../store/global";

const BreadCrumb = (name_, url_) => {

  const {dispatch} = useContext(GlobalStore);
  const [name, setName] = useState(name_);
  const [url, setUrl] = useState(url_);

  useEffect(() => {
    const payload = {url, name};
      dispatch({ type: 'breadcrumb+', payload });
    return () => dispatch({ type: 'breadcrumb-', payload });
  },[dispatch, name, url]);

  return [setName, setUrl]
};

export default BreadCrumb;
