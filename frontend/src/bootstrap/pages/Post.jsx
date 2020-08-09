/*
* @file Post.jsx
* @description〈一句话功能简述〉
* @author Jansora
* @date 2020-04-15 15:25
*/
import React from 'react';

import Banner from "../Banner";
import {Button} from "semantic-ui-react";
import {Link} from "react-router-dom";

const Post = () => {
  return (
    <div>
      <Banner top={"30vh"} left={"70vw"}>
        <h1>博客</h1>
        <p>记录技术人生, 记录生活的点点滴滴</p>
        <footer>
          <Button basic inverted as={Link} to={"/post"} icon='home' content="进入博客"/>
        </footer>
      </Banner>
    </div>
  )
}
export default Post;
