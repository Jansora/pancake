/*
* @file GetUser.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2020-01-16 15:23
*/
import {useContext} from 'react';
import {GlobalStore} from "../../store/global";

const GetUser = () => {

  const { user } = useContext(GlobalStore);
  return user;
}
export default GetUser;
