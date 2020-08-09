/*
* @file post.jsx
* @author jansora
* @date 2020/2/11
*/


import React, {useRef} from "react";
import {Button, Divider, Header} from "semantic-ui-react";
import {QueryPost, UpdatePostLike} from "../../request/post";
import DocEditor from "../editor/doc-editor";
import {withRouter} from 'react-router-dom'
import GetUser from "../hooks/GetUser";
import CommentBar from "../commentbar";
import {StyledDescription} from "../../styled/GlobalStyles";

import Reward from 'react-rewards';
import GetTheme from "../hooks/GetTheme";

import {StyledLikeDiv} from "../../styled/posts";
import styled from "styled-components";
import RightMenu from "./RightMenu";
import SetTitle from "../hooks/SetTitle";

const MenuWrapper = styled.div`
  position: fixed;
  right: 10px;
  top: 0;
  z-index: 2;
  line-height: 40px;
`

const PostContent = (props) => {

    const {resource, setAnchors, topic} = props;

    const updateToc = () => {
        setTimeout(() => {
            const article = document.querySelector(".custom-html-style");
            if(null == article) return;
            const hs = article.querySelectorAll("h1,h2,h3,h4,h5,h6");
            const Anchor = [];

            hs.forEach((item, index) => {
                const h = item.nodeName.substr(0, 2).toLowerCase()
                item.id = `Anchor-${h}-${index}`;
                Anchor.push({id: `Anchor-${h}-${index}`, text: item.textContent});
            })
            setAnchors(Anchor)
        }, 1000);
    }

    const [post, setPost, loading, setLoading] = QueryPost(resource, updateToc)


    const likeRef = useRef();

    const user = GetUser();
    const theme = GetTheme();
    const isOwner = user.id === post.ownerId;

    const updateLikeNum = () => {
        UpdatePostLike(resource, setLoading, setPost);
        likeRef.current.rewardMe();
    }

    SetTitle(post.title)


    const menus = <MenuWrapper >
        <RightMenu post={post} topic={topic} menus={['edit', 'delete']}/>
    </MenuWrapper>
    return (
      <div style={{width: "100%"}}>
          {
              isOwner && menus
          }

          <DocEditor readonly={true} value={post.raw} />

          {
              post && post.id &&
              <StyledLikeDiv>
                  <StyledDescription>若有收获，就点个赞吧</StyledDescription>
                  <Reward
                    ref={likeRef}
                    type={"confetti"}
                  >
                      <Button
                        color={theme}
                        icon='pointing up'
                        circular onClick={()=> updateLikeNum()}
                      />
                  </Reward>
                  <StyledDescription>已收获 {post.likeNum} 个赞 </StyledDescription>
              </StyledLikeDiv>
          }

          <Header style={{marginTop: 50}}>评论 <StyledDescription>有什么疑问或建议，请在下方留言，谢谢！</StyledDescription></Header>
          <Divider />
          {
              post && post.id &&
              <CommentBar parentId={post.id} ownerType='post'/>
          }



      </div>

    )
}

export default withRouter(PostContent);
