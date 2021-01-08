import React, {useContext, useState} from 'react';
import {GlobalStore} from "../../../components/store/global";
import {UserLogout} from "../../../components/request/user";
import {Button, Divider} from "semantic-ui-react";
import GetCurrentUser from "../../../components/hooks/GetCurrentUser";
import {StyledDescription} from "../../../components/styled/common";
import {useHistory} from "react-router-dom";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/06 14:23:47
 */
const Current = (props) => {
  const [loading, setLoading] = useState(false);

  const { theme, dispatch } = useContext(GlobalStore);
  const history = useHistory();

  const user = GetCurrentUser()
  const setUser = user => {
    dispatch({type: 'user', payload: user});
    history.push(`/about/user/signin`);
  };


  const signOut = () => {

    setLoading(true);
    UserLogout(setUser);
  }
  return <React.Fragment>
    <h3>当前用户信息</h3>
    <Divider />
    <h4> <StyledDescription>用户名: </StyledDescription> {user.name} </h4>
    <h4> <StyledDescription>别名: </StyledDescription> {user.alias} </h4>
    <h4> <StyledDescription>凭据(token): </StyledDescription> {user.token} </h4>
    <Divider />
    <Button fluid color={theme} content='退出登录' onClick={() => signOut()}/>


  </React.Fragment>;
}

export default Current;
