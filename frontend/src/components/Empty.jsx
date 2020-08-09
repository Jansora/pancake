/*
* @file Empty.jsx
* @author jansora
* @date 2020-01-17
*/
import React from 'react';
import {Header, Icon, Segment} from 'semantic-ui-react'

const Empty = (props) => {
  return (
    <Segment placeholder style={props.style ? props.style : {}}>
      <Header icon>
        <Icon name='bullhorn' />
        {props.description ? props.description : "这里是空的"}
      </Header>
    </Segment>
  )
}



export default Empty;
