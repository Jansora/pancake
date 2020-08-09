/*
* @file login.jsx
* @author jansora
*/
import React, {useContext, useState} from 'react';

import {Button, Form, Header, Icon, Message, Modal} from "semantic-ui-react";
import {Divider} from "antd";
import {GlobalStore} from "../../store/global";

import {UserLogin} from "../../request/user";
import GetTheme from "../../components/hooks/GetTheme";
import Register from "./register";


const Login = () => {

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepLogin, setKeepLogin] = useState(true);
  const { theme, dispatch } = useContext(GlobalStore);

  const [openLoginPane, setOpenLoginPane] = useState(false);
  const [openRegisterPane, setOpenRegisterPane] = useState(false);

  const setUser = user => dispatch({ type: 'user', payload: user });

  const signIn = () => {

    const data = { username, password, keepLogin };
    setLoading(true);
    UserLogin(data, setLoading, setOpenLoginPane, setUser);
  }


  return (
    <React.Fragment>
      <div>
      <Icon name="sign-in" style={{cursor: 'pointer'}} onClick={() => setOpenLoginPane(true)}/>
      </div>
      <Register
          openRegisterPane={openRegisterPane}
          setOpenRegisterPane={setOpenRegisterPane}
          openLoginPane={openLoginPane}
          setOpenLoginPane={setOpenLoginPane}
      />
        <Modal
            color={GetTheme()}
            open={openLoginPane}
            onClose={()=> setOpenLoginPane(false)}
            style={{width: '400px'}}
        >
            <Header as='h3' attached='top' textAlign="center">
                登录
            </Header>

            <Form style={{padding: "1rem"}} loading={loading}>
                <Form.Input
                    required
                    label='用户名' placeholder='请输入你的用户名(登录时使用)' type='text'
                            value={username} onChange={e => setUsername(e.target.value)}/>
                <Form.Input label='密码' type="password" placeholder='请输入你的密码' value={password}
                            onChange={e => setPassword(e.target.value)}/>
                <Form.Checkbox
                    // on
                    onChange={()=>setKeepLogin(!keepLogin)}
                    checked={keepLogin}
                    inline label='30天内保持登录状态' />
                <Divider style={{margin: '20px 0 12px 0'}}/>

                <Button fluid color={theme} content='登录' onClick={() => signIn()}/>
            </Form>






            <Message attached='bottom' warning>
                <Icon name='help' />
                还没有账户, 去 <a href='#' onClick={event => {
                    event.preventDefault();
                    setOpenLoginPane(false)
                    setOpenRegisterPane(true)
                }}>注册</a>.
            </Message>
        </Modal>

    </React.Fragment>
  )
}
export default Login;
