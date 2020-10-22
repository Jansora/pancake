/*
* @file Topic.jsx
* @description〈一句话功能简述〉
* @author Jansora
* @date 2020-04-15 15:25
*/
import React from 'react';

import Banner from "../Banner";
import {Button} from "semantic-ui-react";
import {Link} from "react-router-dom";

const Topic = () => {
  return (
    <div>
      <Banner top={"30vh"} left={"20vw"}>
        <h1>专栏</h1>
        <p>善于记录, 善于整理, 好记性不如烂笔头, 每次的进步是为了更好的明天</p>
        <footer>
          <Button basic inverted as={Link} to={"/topic"}>进入专栏</Button>
        </footer>
      </Banner>

    </div>
  )
}
export default Topic;
