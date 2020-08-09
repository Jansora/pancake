/*
* @file addTopic.jsx
* @description〈一句话功能简述〉
* @author jansora

*/
import React, {useState} from 'react';


import {Button, Form, Grid, GridColumn, Header, Modal} from "semantic-ui-react";

import GetTheme from "../hooks/GetTheme";


import {Divider} from "antd";
import {AddTopic, UpdateTopic} from "../../request/topic";
import UploadImage from "../upload/UploadImage";

const EditTopic = (props) => {

  // editable 为 true 为编辑模式, 否则为新建模式
  const {editable, topic, setTopic} = props;


  const {open, setOpen} = props;

  const [loading, setLoading] = useState(null);

  const [title, setTitle] = useState(editable ? topic.title : '');
  const [description, setDescription] = useState(editable ? topic.description : '');
  const [url, setUrl] = useState(editable ? topic.url : '');
  const [logo, setLogo] = useState(editable ? topic.logo : '');
  const [permission, setPermission] = useState(editable ? topic.permission === 'PRIVATE' : false);


  const args = {
    title, description, url, logo,
    permission : permission ? 'PRIVATE' : 'PUBLIC',
  };
  const add = () => {

    AddTopic(args, setOpen)
  };

  const update = () => {

    UpdateTopic(args, setOpen, setTopic, null)
  };

  return (

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{width: "500px"}}

      >
        <Header as='h3' attached='top' textAlign="center">
          {
            editable ? `编辑专栏 - ${topic.title}` : '创建专栏'
          }
        </Header>

            <Form style={{padding: "1rem"}} loading={loading}>
              <Grid columns="equal">
                <GridColumn width={11}>
              <Form.Input
                  required
                  label='标题' placeholder='请输入专栏标题' type='text'
                  value={title} onChange={event => setTitle(event.target.value)}/>
              <Form.Input label="url" placeholder="请输入url"
                          value={url} onChange={event => setUrl(event.target.value)}/>
                </GridColumn>
                <GridColumn>
                  <UploadImage
                      img={logo}
                      callback={setLogo} style={{ height: 107, marginTop: 16, marginLeft: 14, width: 114}}
                  />
                </GridColumn>
              </Grid>
              <Form.TextArea
                  label="简介"
                  style={{height: 84}}
                  value={description} onChange={event => setDescription(event.target.value)}
                  placeholder="请输入简介" />
              <Form.Field required style={{marginLeft: 8}}>
                <label>权限配置</label>
                {/*<Radio style={{marginTop: 8}} toggle checked={permission} onChange={(_, {checked}) => setPermission(checked)}/>*/}
                <Form.Checkbox style={{}}
                               toggle={false}
                          label="仅自己可见"
                          checked={permission}
                               onChange={(_, {checked}) =>
                                   setPermission(checked)}
                />

              </Form.Field>
              <Divider style={{margin: '20px 0 12px 0'}}/>
              {
                editable ?
                    <Button
                        fluid
                        // style={{ height: 114, marginTop: 19, width: '100%'}}
                        color={GetTheme()} content='更新专栏' onClick={() => update()}
                    />
                    :  <Button
                        fluid
                        // style={{ height: 114, marginTop: 19, width: '100%'}}
                        color={GetTheme()} content='创建专栏' onClick={() => add()}
                    />
              }
            </Form>



      </Modal>

  )
}
export default EditTopic;
