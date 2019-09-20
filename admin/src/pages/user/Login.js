import React, {Component} from 'react';
import {connect} from 'dva';

import {Alert, Button, Form, Input} from 'antd';
import Login from './components/Login';
import styles from './Login.less';

const {Tab, UserName, Password, Mobile, Captcha, Submit} = Login;

@connect(({login, loading}) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    UserName: '',
    Password: '',
  };


  handleSubmit = (e) => {
    e.preventDefault()
    const {UserName, Password} = this.state;
    const {dispatch} = this.props;
    dispatch({
      type: 'login/login',
      payload: {
        UserName, Password
      },
    });

  };



  render() {
    const { submitting} = this.props;
    const {UserName, Password} = this.state;
    return (
      <div className={styles.main}>
        <Form
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Form.Item>
            <Input
              name="userName"
              placeholder={`输入用户名`}
              value={UserName} onChange={e=> this.setState({UserName: e.target.value})}/>
          </Form.Item>

          <Form.Item>
            <Input
              name="passWord"
              type="password"
              placeholder={`输入密码`}
              value={Password} onChange={e=> this.setState({Password: e.target.value})}
            />
          </Form.Item>

          <Form.Item>

            <Button loading={submitting} block type="primary" htmlType="submit">登录</Button>
          </Form.Item>

        </Form>
      </div>
    );
  }
}

export default LoginPage;
