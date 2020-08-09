/*
* @file UserAvatar.jsx
* @author jansora
*/
import React from 'react';
import {Avatar} from "antd";
import {Button, Card, Popup} from "semantic-ui-react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const UserAvatarWrapper = styled.span`
  i {
  font-size: 16px !important;
    color: var(--primary-color);
  }
  span.ant-avatar.ant-avatar-circle{
    background: var(--primary-color);
    span.ant-avatar-string {
        color: white;
    }
  }
`

const CardWrapper = styled(Card)`
  box-shadow: none !important;
  margin: 0 !important;
`

const UserAvatar = (props) => {



  const {user, style, popup} = props;
  if (!user || !user.alias) return null;
  const hasAvatar = user.avatar && user.avatar !== '';
  const trigger = <UserAvatarWrapper style={style ? style : {}}>
    {
      hasAvatar ?
        <Avatar src={user.avatar} />
        :
        <Avatar >{user.alias.substring(user.alias.length-2)}</Avatar>

    }
  </UserAvatarWrapper>

  if (!popup ) return trigger;

  return (
    <Popup trigger={trigger} flowing hoverable>
      <CardWrapper>
        <Card.Content>
          {
            hasAvatar ?
              <Avatar src={user.avatar} style={{float: "right"}} />
              :
              <Avatar >{user.alias.substring(user.alias.length-2)}</Avatar>
          }
          <Card.Header>{user.alias}</Card.Header>
          {/*<Card.Meta>开发工程师</Card.Meta>*/}
          <Card.Description>
            {user.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green' as={Link} to={`/user/${user.id}`}>
              TA 的主页
            </Button>
            <Button basic color='red' as={Link} to={`/user/${user.id}`}>
              TA 的主页
            </Button>
          </div>
        </Card.Content>
      </CardWrapper>
    </Popup>
  )
};

export default UserAvatar;
