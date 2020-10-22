/*
* @file register.jsx
* @author jansora
*/
import React, {useContext, useState} from 'react';

import {Button, Form, Header, Icon, Message, Modal} from "semantic-ui-react";
import {Divider} from "antd";
import {GlobalStore} from "../../store/global";

import {UserRegister} from "../../request/user";
import GetTheme from "../../components/hooks/GetTheme";


const Register = (props) => {

    const {openLoginPane, setOpenLoginPane, openRegisterPane, setOpenRegisterPane} = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepLogin, setKeepLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const { theme, dispatch } = useContext(GlobalStore);


    const setUser = user => dispatch({ type: 'user', payload: user });

    const signIn = () => {

    const data = {
      username, password, keepLogin
    };
    UserRegister(data, setLoading, setOpenRegisterPane, setUser);
  }

  return (
    <React.Fragment>
        <Modal
            color={GetTheme()}
            open={openRegisterPane}
            onClose={()=> setOpenRegisterPane(false)}
            style={{width: '400px'}}
        >
            <Header as='h3' attached='top' textAlign="center">
                注册
            </Header>

            <Form style={{padding: "1rem"}} loading={loading}>
                <Form.Input
                    required
                    label='用户名' placeholder='请输入你的用户名(登录时使用)' type='text'
                            value={username} onChange={e => setUsername(e.target.value)}/>
                <Form.Input label='密码' type="password" placeholder='请输入你的密码' value={password}
                            onChange={e => setPassword(e.target.value)}/>

                <Divider style={{margin: '20px 0 12px 0'}}/>

                <Button fluid color={theme} content='注册并登录' onClick={() => signIn()}/>
            </Form>




            <Message attached='bottom' warning>
                <Icon name='help' />
                已经有账户了, 去 <a href='#' onClick={event => {
                    event.preventDefault();
                    setOpenLoginPane(true)
                    setOpenRegisterPane(false)
                }}>登录</a>.
            </Message>
        </Modal>
    </React.Fragment>
  )
}
export default Register;
