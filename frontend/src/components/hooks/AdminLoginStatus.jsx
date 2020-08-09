/*
* @file AdminLoginStatus.jsx
* @author jansora
* @date 2019-12-17 11:01
*/
import React, {useContext, useEffect, useState} from 'react';

import {GlobalStore} from "../../store/global";

const AdminLoginStatus = () => {

  const [status, setStatus] = useState(false);
  const {user} = useContext(GlobalStore);
  useEffect(() => {

      setStatus((user.id !== undefined && user.id !== "" && user.role === "admin"))
  }, [user]);


  return status
}
export default AdminLoginStatus;
