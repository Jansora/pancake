/*
* @file addProject.jsx
* @description〈一句话功能简述〉
* @author jansora

*/
import React, {useState} from 'react';


import {Button, Form, Grid, GridColumn, Header, Modal, Radio} from "semantic-ui-react";

import GetTheme from "../hooks/GetTheme";


import {Divider} from "antd";
import {AddProject, UpdateProject} from "../../request/project";
import UploadImage from "../upload/UploadImage";

const EditProject = (props) => {

  // editable 为 true 为编辑模式, 否则为新建模式
  const {editable, project, setProject} = props;

  const {open, setOpen} = props;


  const [loading, setLoading] = useState(null);

  const [title, setTitle] = useState(editable ? project.title : '');
  const [description, setDescription] = useState(editable ? project.description : '');
  const [url, setUrl] = useState(editable ? project.url : '');
  const [logo, setLogo] = useState(editable ? project.logo : '');
  const [iframe, setIframe] = useState(editable ? project.iframe : '');
  const [permission, setPermission] = useState(editable ? project.permission === 'PRIVATE' : false);


  const args = {
    title, description, url, logo, iframe,
    permission : permission ? 'PRIVATE' : 'PUBLIC',
  };
  const add = () => {

    AddProject(args, setOpen)
  };

  const update = () => {

    UpdateProject({...args, id: project.id}, setOpen, setProject, null)
  };

  return (

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{width: "500px"}}

      >
        <Header as='h3' attached='top' textAlign="center">
          {
            editable ? `编辑项目 - ${project.title}` : '创建项目'
          }
        </Header>

            <Form style={{padding: "1rem"}} loading={loading}>
              <Grid columns="equal">
                <GridColumn width={11}>
              <Form.Input
                  required
                  label='标题' placeholder='请输入项目标题' type='text'
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
              <Form.Input label="iframe" placeholder="请输入内嵌页面地址"
                          value={iframe} onChange={event => setIframe(event.target.value)}/>
              <Form.TextArea
                  label="简介"
                  style={{height: 84}}
                  value={description} onChange={event => setDescription(event.target.value)}
                  placeholder="请输入简介" />

              <Form.Field required style={{marginLeft: 8}}>
                <label>隐藏该项目</label>
                <Radio style={{marginTop: 8}} toggle checked={permission} onChange={(_, {checked}) => setPermission(checked)}/>
              </Form.Field>
              <Divider style={{margin: '20px 0 12px 0'}}/>
              {
                editable ?
                    <Button
                        fluid
                        // style={{ height: 114, marginTop: 19, width: '100%'}}
                        color={GetTheme()} content='更新项目' onClick={() => update()}
                    />
                    :  <Button
                        fluid
                        // style={{ height: 114, marginTop: 19, width: '100%'}}
                        color={GetTheme()} content='创建项目' onClick={() => add()}
                    />
              }
            </Form>



      </Modal>

  )
}
export default EditProject;
