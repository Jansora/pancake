/*
* @file PostItem.jsx
* @author jansora
* @date 2020/2/12
*/


import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import UserAvatar from "../avatar/UserAvatar";
import {StyledDescription} from "../../styled/GlobalStyles";
import * as moment from "moment";
import {Label} from "semantic-ui-react";
import GetTheme from "../hooks/GetTheme";

const PostWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  border-top: 1px solid rgb(186, 186, 186);
  border-bottom: 1px solid rgb(186, 186, 186);
  div.wrapper{
     width: calc(100% - 200px);
     div.main{
        height: 100%;
        display: flex;
        flex-direction: column;    
        padding: 16px 16px 0;
        a.title {
            display: block;
            color: black;
            font-size: 18px;
            font-weight: bolder;
            margin-bottom: 16px;
            height: 21px;
            overflow: hidden;
        }
        div.bottom {
          height: 32px;
          overflow: visible;
          position: absolute;
          margin-top: 93px;
          a {
            margin-left: 10px;
          }
        }
        p.description {
            color: rgba(0, 0, 0, 0.64);
            font-size: 14px;
            height: 41px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        } 
     }
  }
  img.logo{
      width: 200px;
      margin: 10px;
  }
`

const PostItem = (props) => {
    const { post, setTag } = props;
    const theme = GetTheme();
    return (
        <PostWrapper>

            <div className="wrapper">
                <div className="main">
                    <Link to={`/post/${post.url}`} className="title">{post.title}</Link>
                    <p className="description">{post.description}</p>
                    <div className="bottom"> <UserAvatar popup={true} user={post.owner}/>
                        <Link to={`/user/${post.owner.id}`} >{post.owner.username} </Link>
                        <StyledDescription> 更新于 {moment(post.updateAt).fromNow()}</StyledDescription>
                        {
                            post.tags &&
                            post.tags.map(tag =>
                                <Label
                                    onClick={()=> setTag && setTag(tag)}
                                    as="a" key={tag} color={theme} >{tag}</Label>)
                        }

                    </div>
                </div>
            </div>
            <img className="logo" alt={post.title} src={post.logo + '?x-oss-process=style/posts'} />

        </PostWrapper>
    )
}

export default PostItem;
