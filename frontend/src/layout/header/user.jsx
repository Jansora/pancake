/*
* @file user.jsx
* @author jansora
* @date 2019-12-17 16:30
*/
import React, {useContext, useState} from 'react';
import LoginStatus from "../../components/hooks/LoginStatus";
import {Dropdown} from "semantic-ui-react";
import Login from "./login";

import {defaultValue, GlobalStore} from "../../store/global";
import UserAvatar from "../../components/avatar/UserAvatar";
import {UserLogout} from "../../request/user";
import EditUser from "../../components/user/EditUser";
import {NavLink} from "react-router-dom";

const User = () => {

  const loginStatus = LoginStatus();
  const [open, setOpen,] = useState(false);
  const { user, dispatch } = useContext(GlobalStore);


  const setUser = user => dispatch({ type: 'user', payload: defaultValue.user });

  const signOut = () => {

    UserLogout(setUser);

  };


  if(!loginStatus) return <Login/>;

  return (
      <React.Fragment>
      <Dropdown
        trigger={<UserAvatar popup={false} user={user} style={{marginTop: "-7px"}}/>}
        icon={null}
        pointing='top right'
      >
        <Dropdown.Menu>
          <Dropdown.Item as={NavLink} to={`/user/${user.id}`} icon='user'  text='个人主页' />
          <Dropdown.Item onClick={()=>setOpen(true)} icon='setting'  text='设置' />
          <Dropdown.Divider />

          <Dropdown.Item icon='sign-out' text='退出登录' onClick={() => signOut()}/>
        </Dropdown.Menu>
      </Dropdown>
        {open && <EditUser user={user} editable={false} open={open} setOpen={setOpen} />}
      </React.Fragment>
  )
};

export default User;
