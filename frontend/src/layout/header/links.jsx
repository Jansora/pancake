/*
* @file link.jsx
* @description〈一句话功能简述〉
* @author jansora
* @date 2019-04-08 11:36
*/
import React from 'react';
import {Dropdown, Icon} from "semantic-ui-react";

const Links = () => {



  return (
    <Dropdown
      trigger={
        <Icon
          name='staylinked'
          title='外链'
          style={{margin: 0}}
        />
      }
      icon={null}
      pointing='top right'
    >
      <Dropdown.Menu>

        <Dropdown.Item as="a" target="_blank" href={`https://reactjs.org`}  icon='react'  text='React' />
        <Dropdown.Item as="a" target="_blank" href={`https://spring.io/projects/spring-boot`}  icon='linkify'  text='Spring Boot' />

      </Dropdown.Menu>
    </Dropdown>
  )
}
export default Links;
