import React, {useContext, useState} from 'react';
import {GlobalStore} from "../../../components/store/global";
import {UserLogout} from "../../../components/request/user";
import {Button, Card} from "semantic-ui-react";
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
    <Card fluid loading={loading.toString()}>
      <Card.Content>
        <Card.Header content={<>{user.alias} <StyledDescription>{user.username}</StyledDescription></>} />
        <Card.Meta content='Musicians' />
        <Card.Description content={user.description} />
        <Button fluid color={theme} content='退出登录' onClick={() => signOut()}/>

      </Card.Content>
    </Card>



  </React.Fragment>;
}

export default Current;
