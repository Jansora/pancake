/*
* @file newFolder.jsx
* @author jansora

*/
import React, {useState} from 'react';


import {Button, Form, Header, Modal} from "semantic-ui-react";

import GetTheme from "../hooks/GetTheme";


import {Divider} from "antd";
import {AddCatalog, UpdateCatalog} from "../../request/catalog";

const EditFolder = (props) => {

  // editable 为 true 为编辑模式, 否则为新建模式
  const {editable, parentId, id, resource} = props;

  const {open, setOpen} = props;


  const [loading, setLoading] = useState(null);

  const [title, setTitle] = useState(editable ? props.title : '');

  const nodeType = 'folder';
  const add = () => AddCatalog({resource, title, nodeType, parentId}, setOpen)

  const update = () => UpdateCatalog({id, title, nodeType, parentId}, setOpen)

  return (

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{width: "300px"}}

      >
        <Header as='h3' attached='top' textAlign="center">
          {
            editable ? `编辑文件夹 - ${title}` : '创建文件夹'
          }
        </Header>

        <Form style={{padding: "1rem"}} loading={loading}>
          <Form.Input
              required
              label='标题' placeholder='请输入文件夹标题' type='text'
              value={title} onChange={event => setTitle(event.target.value)}/>
          <Divider style={{margin: '20px 0 12px 0'}}/>
          {
            editable ?
                <Button
                    fluid
                    color={GetTheme()} content='更新文件夹' onClick={() => update()}
                />
                :  <Button
                    fluid
                    color={GetTheme()} content='创建文件夹' onClick={() => add()}
                />
          }
        </Form>

      </Modal>

  )
}
export default EditFolder;
