import React, {useState} from 'react';


import {Button, Form, Input, Modal, Radio} from "semantic-ui-react";

import GetTheme from "../hooks/GetTheme";
// import {QueryTags} from "../../request/easycode/component";
import {AddCatalog} from "../../request/catalog";

const NewPost = (props) => {


  // editable 为 true 为编辑模式, 否则为新建模式
  const {editable, post, setPost, toTopic} = props;


  const {open, setOpen} = props;


  const [title, setTitle] = useState(editable ? post.title : '');
  const [description, setDescription] = useState(editable ? post.description : '');
  const [url, setUrl] = useState(editable ? post.url : '');

  const [permission, setPermission] = useState(editable ? post.permission === 'PRIVATE' : false);



  const add = () => {
    const args = {
      permission : permission ? 'PRIVATE' : 'PUBLIC',
      title, description, url, logo: '', raw: "", tags: [],
    };

    const nodeType = 'doc';
    const { parentId, resource } = props;
    AddCatalog({...args, nodeType, parentId, resource}, setOpen)


  };

 return (

    <Modal
      open={open}
      onClose={() => setOpen(false)}
      style={{width: "300px"}}

    >
        <Modal.Header as='h3' attached='top' textAlign="center">
            创建文件夹
        </Modal.Header>
      <Modal.Content>
        <Form style={{marginBottom: 20}}>

                <Form.Field required>
                  <label>标题</label><Input placeholder="请输入标题"
                                          value={title} onChange={event => setTitle(event.target.value)}/>
                </Form.Field>
                <Form.Field required>
                  <label>url</label><Input placeholder="请输入url"
                                           value={url} onChange={event => setUrl(event.target.value)}/>
                </Form.Field>

                <Form.Field required style={{marginLeft: 8}}>
                  <label>隐藏该文档</label>
                  <Radio style={{marginTop: 8}} toggle checked={permission} onChange={(_, {checked}) => setPermission(checked)}/>
                </Form.Field>




              <Button
                    style={{ marginTop: 19, width: '100%'}}
                    color={GetTheme()} content='创建文档' onClick={() => add()}
                  />



        </Form>
      </Modal.Content>


    </Modal>

  )
}
export default NewPost;
