/*
* @file Project.jsx
* @description〈一句话功能简述〉
* @author Jansora
* @date 2020-04-15 15:25
*/
import React from 'react';

import Banner from "../Banner";
import {Button} from "semantic-ui-react";
import {Link} from "react-router-dom";

const Project = () => {
  return (
    <div>
      <Banner top={"30vh"} left={"70vw"}>
        <h1>项目</h1>
        <p>记录每一个好玩的东西</p>
        <footer>
          <Button basic inverted as={Link} to={"/project"} icon='home' content="进入项目"/>
        </footer>
      </Banner>
    </div>
  )
}
export default Project;
