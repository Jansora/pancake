/*
* @file addUser.jsx
* @description〈一句话功能简述〉
* @author jansora

*/
import React, {useContext, useState} from 'react';


import {Button, Form, Grid, GridColumn, Header, Modal} from "semantic-ui-react";

import GetTheme from "../hooks/GetTheme";


import {Divider} from "antd";
import {UpdateUser} from "../../request/user";
import UploadImage from "../upload/UploadImage";
import {GlobalStore} from "../../store/global";

const EditUser = (props) => {

  // editable 为 true 为编辑模式, 否则为新建模式
  const {user} = props;
  const theme = GetTheme();


  const {open, setOpen} = props;

  const [loading, setLoading] = useState(null);

  const [alias, setAlias] = useState(user.alias);
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState(user.description ? user.description : '');
  const [avatar, setAvatar] = useState(user.avatar ? user.avatar : '');


  const { dispatch } = useContext(GlobalStore);

  const update = () => {
    const args = { id: user.id,
      alias, description, avatar, password
    };
    const setUser = user => dispatch({ type: 'user', payload: user })
    UpdateUser(args, setOpen, setUser, null)
  };

  return (

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{width: "500px"}}

      >
        <Header as='h3' attached='top' textAlign="center">编辑个人信息</Header>

        <Form style={{padding: "1rem"}} loading={loading}>



          <Grid columns="equal">
            <GridColumn width={11}>
              <Form.Input
                  required
                  label='昵称' placeholder='请输入你的新昵称' type='text'
                  value={alias} onChange={e => setAlias(e.target.value)}/>
              <Form.Input label='密码' type="password" placeholder='请输入修改后的密码' value={password}
                          onChange={e => setPassword(e.target.value)}/>
            </GridColumn>
            <GridColumn>
              <UploadImage
                  img={avatar}
                  callback={setAvatar} style={{ height: 107, marginTop: 16, marginLeft: 14, width: 114}}
              />
            </GridColumn>
          </Grid>

          <Form.TextArea
              label="简介"
              style={{height: 84}}
              value={description} onChange={event => setDescription(event.target.value)}
              placeholder="请输入简介" />


          <Divider style={{margin: '20px 0 12px 0'}}/>
          <Button fluid color={theme} content='更新' onClick={() => update()}/>
        </Form>



      </Modal>

  )
}
export default EditUser;
