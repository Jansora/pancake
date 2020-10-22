/*
* @file Item.jsx
* @description〈一句话功能简述〉
* @author Jansora
* @date 2020-03-16 18:11
*/
import React, {useState} from 'react';
import {Button, Header, Label} from "semantic-ui-react";

import styled from "styled-components";

import {Link} from "react-router-dom";


import GetTheme from "./hooks/GetTheme";
import UserAvatar from "./avatar/UserAvatar";


const ImageWrapper = styled.img`

    z-index: -1;
    opacity: 0.20;

    width: 270px;
    height: 140px;
    margin-top: -16px;
    margin-left: -16px;
    position: absolute;
    display: block !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-position: center !important;

    transition: opacity ease-in-out 500ms;

`

const BackgroundWrapper = styled.div`

    z-index: -1;
    opacity: 0.20;

    width: 270px;
    height: 148px;
    margin-top: -16px;
    margin-left: -16px;
    position: absolute;
    display: block !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-position: center !important;

    transition: opacity ease-in-out 500ms;
    background-image: linear-gradient(25deg, #8d72b2, #8f90bd, #8eaec7, #89ccd2);
    
`

const ItemWrapper= styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: .28571429rem;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
  margin: 16px 16px 0 0 ;
  padding: 16px;

  width: 270px;
  height: 148px;
  
  h3 {
    margin: 0 0 6px 0 !important;
  }
  p {
    color: rgba(0, 0, 0, 0.64);
    font-size: 14px;
    height: 41px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &:hover{
    > img {
      opacity: 0.5;
    }
    div.background {
      opacity: 0.73;
    }
  }
  &:hover {
    //margin-top: 16px;
    transform: translateY(-4px);
    transition: transform 318ms;
  }
`


const Item = (props) => {


  const [active, setActive] = useState(false)
  const { payload, callback, buttonProps, tag } = props;
  const theme = GetTheme();

  let logo = null;
  if(payload && payload.logo && payload.logo !== "") {
    logo = payload.logo.endsWith("?x-oss-process=style/posts") ? payload.logo : payload.logo + "?x-oss-process=style/posts";
  }


  return (

    <ItemWrapper onMouseEnter={() => setActive(true)} onMouseLeave={()=> setActive(false)}>
      {
        logo ? <ImageWrapper src={logo} /> : <BackgroundWrapper className="background"/>
      }
      {
        tag && <Label as='a' color={theme} ribbon='right' style={{marginTop: -29}}>
          {tag}
        </Label>
      }

      <Header as='h3'>{payload.title}</Header>
      <p>{payload.description}</p>
      <div style={{width: "100%"}}>

        <UserAvatar popup={true} user={payload.owner}/>
        <Link to={`/user/${payload.owner.id}`} style={{marginLeft: 10}}>{payload.owner.alias} </Link>
        {
          <Button
            onClick={() => callback && callback()}
            floated="right" size="mini" basic={!active} color={theme}
            children={'查看详情'}
            {...buttonProps ? buttonProps : {}}
          />

        }

      </div>
    </ItemWrapper>

  )
}

export default Item;


