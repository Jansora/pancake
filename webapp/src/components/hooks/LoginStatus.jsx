/*
* @file CheckLogin.jsx
* @author jansora
* @date 2019-12-17 11:01
*/
import {useContext, useEffect, useState} from 'react';

import {GlobalStore} from "../store/global";

const LoginStatus = () => {

  const [status, setStatus] = useState(false);
  const {user} = useContext(GlobalStore);
  useEffect(() => {
    setStatus((user.name !== ""))
  }, [user]);


  return status
}
export default LoginStatus;
