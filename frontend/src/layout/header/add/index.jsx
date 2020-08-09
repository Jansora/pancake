/*
* @file add.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2019-12-17 11:36
*/
import React, {useState} from 'react';
import {Dropdown, Icon} from "semantic-ui-react";
import EditTopic from "../../../components/topic/EditTopic";


import EditProject from "../../../components/project/EditProject";
import UploadFileComponent from "../../../components/upload/UploadFile";
import {Link} from "react-router-dom";

const Add = () => {

  const [openNewTopic, setOpenNewTopic] = useState(false);

    const [openNewProject, setOpenNewProject] = useState(false);


  return (
    <React.Fragment>
      <Dropdown

        trigger={
          <Icon
            title='新建'
            name='add circle'
            style={{margin: 0}}
          />
        }
        icon={null}
        pointing='top left'
      >
        <Dropdown.Menu >
          <Dropdown.Item>
            <Link to="/post/new" ><Icon name="file"/> 新建文档</Link>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setOpenNewTopic(true)} icon='folder open' text='新建专栏' />
          <Dropdown.Item onClick={() => setOpenNewProject(true)} icon='folder open' text='新建项目' />


          <Dropdown.Divider/>
          <Dropdown.Item onClick={(event) => event.preventDefault()}>
            <Icon name="upload"/>
            <UploadFileComponent>
              上传文件
            </UploadFileComponent>
          </Dropdown.Item>


        </Dropdown.Menu>
      </Dropdown>
      {openNewTopic && <EditTopic editable={false} open={openNewTopic} setOpen={setOpenNewTopic} />}
        {openNewProject && <EditProject editable={false} open={openNewProject} setOpen={setOpenNewProject} />}

    </React.Fragment>
  )
}
export default Add;
