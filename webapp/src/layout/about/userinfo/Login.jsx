import React, {useContext, useState} from 'react';
import {GlobalStore} from "../../../components/store/global";
import {UserLogin} from "../../../components/request/user";
import {Button, Divider, Form} from "semantic-ui-react";
import {useHistory} from "react-router-dom";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/06 12:22:05
 */
const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [Name, setName] = useState('');
  const [Token, setToken] = useState('');


  const { theme, dispatch } = useContext(GlobalStore);
  const history = useHistory();

  const setUser = user => {
    dispatch({type: 'user', payload: user});
    history.push(`/about/user/current`);

  };

  const signIn = () => {

    const data = {  Name, Token };
    setLoading(true);
    UserLogin(data, setLoading, setUser);
  }
  return <React.Fragment>

      <Form style={{padding: "1rem"}} loading={loading}>
        <Form.Input
            required
            label='用户名' placeholder='请输入你的用户名(登录时使用)' type='text'
            value={Name} onChange={e => setName(e.target.value)}/>
        <Form.Input label='密码' type="password" placeholder='请输入你的密码' value={Token}
                    onChange={e => setToken(e.target.value)}/>

        <Divider style={{margin: '20px 0 12px 0'}}/>

        <Button fluid color={theme} content='登录' onClick={() => signIn()}/>
      </Form>


  </React.Fragment>;
}

export default Login;
