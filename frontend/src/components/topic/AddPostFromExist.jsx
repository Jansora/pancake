/*
* @file newFolder.jsx
* @author jansora

*/
import React, {useState} from 'react';


import {Button, Form, Header, Modal} from "semantic-ui-react";

import GetTheme from "../hooks/GetTheme";


import {Divider} from "antd";
import {AddPostFromExistRequest} from "../../request/catalog";

const AddPostFromExist = (props) => {


  const { parentId, resource} = props;


  const {open, setOpen} = props;


  const [url, setUrl] = useState('');


  const nodeType = 'doc';

  const add = () => AddPostFromExistRequest({resource, url, nodeType, parentId}, setOpen);


  return (

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{width: "300px"}}

      >
        <Header as='h3' attached='top' textAlign="center">
          导入文档

        </Header>

        <Form style={{padding: "1rem"}} >

          <Form.Input
              required
              label='文档url' placeholder='请输入文件url' type='text'
              value={url} onChange={event => setUrl(event.target.value)}/>

          <Divider style={{margin: '20px 0 12px 0'}}/>

          <Button
              fluid
              color={GetTheme()} content='确定导入' onClick={() => add()}
          />

        </Form>

      </Modal>

  )
}
export default AddPostFromExist;
