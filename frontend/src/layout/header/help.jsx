/*
* @file help.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2019-04-08 11:36
*/
import React from 'react';
import {Dropdown, Icon} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

const Help = () => {



  return (
    <Dropdown
      trigger={
        <Icon
          name='help circle'
          title='主题'
          style={{margin: 0}}
        />
      }
      icon={null}
      pointing='top right'
    >
      <Dropdown.Menu>
          <Dropdown.Item as="a" target="_blank" href={`https://jansora.gitbook.io/pancake/`}  icon='help circle'  text='帮助文档' />
          <Dropdown.Item as="a" target="_blank" href={`https://github.com/Jansora`}  icon='github'  text='Github' />

        <Dropdown.Item as={NavLink} to={`/topic/help/version`}  icon='gem'  text='版本规划' />
      </Dropdown.Menu>
    </Dropdown>
  )
}
export default Help;
