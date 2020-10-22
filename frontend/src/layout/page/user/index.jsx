/*
* @file index.jsx
* @description〈一句话功能简述〉
* @author Jansora
* @date 2020-04-05 17:44
*/
import React from 'react';
import {Card, Grid} from "semantic-ui-react";
import {NavLink, Switch, useParams} from "react-router-dom";


import styled from "styled-components";
import {QueryUser} from "../../../request/user";
import SetTitle from "../../../components/hooks/SetTitle";
import UserAvatar from "../../../components/avatar/UserAvatar";


const StyledAside = styled.aside`

    width: 240px;

    //height: calc(100vh - var(--header-height) );
    
    
    position: fixed;
    overflow: hidden;

    //top: 
   
   
    display: flex;
    flex-direction: column;
    a {

      cursor: pointer;
      display: flex;
      height: 40px;
      line-height: 22px;
      outline: none;
      padding: 9px 20px;
      position: relative;
      user-select: none;
    }
    a:hover, a.active {
      border-radius: 4px;
      color: #383838;
      font-weight: bold;

      i {
        color: var(--primary-color);
      }
    }
    a:hover{
      background-color: hsla(0,0%,89.8%,.4);
    }
    a.active{
      background-color: var(--active-backgroud-color);
    }
    
    div.card {
      box-shadow: none !important;
    }
`;

const User = (props) => {

  const { id } = useParams();


  const [user] = QueryUser(id);

    SetTitle("")


  return (

    <Grid columns='equal' style={{marginTop:30}}>
      <Grid.Column/>
      <Grid.Column width={3}>
        <StyledAside>
          <Card>
            <Card.Content>



              <Card.Header>{user && user.alias}            <UserAvatar user={user} style={{float: "right", marginTop: "-7px"}} popup={true}/></Card.Header>
              <Card.Meta>{user && user.position}</Card.Meta>
              <Card.Description>
                {user && user.description}
              </Card.Description>

            </Card.Content>

          </Card>

          <NavLink to={`/user/${id}/blog`}>博客</NavLink>
        </StyledAside>
      </Grid.Column>
      <Grid.Column width={9}>

        <Switch>
          {/*<Route path={`/user/:id/thoughts`} component={Thoughts} exact={false}/>*/}
        </Switch>
      </Grid.Column>
      <Grid.Column/>
    </Grid>

  )
}
export default User;
