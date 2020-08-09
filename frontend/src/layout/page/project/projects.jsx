/*
* @file projects.jsx
* @author jansora
* @date 2020/4/5
*/


import React from "react";

import {Link} from 'react-router-dom'
import {QueryProjects} from "../../../request/project";
import Item from "../../../components/Item";
import styled from "styled-components";
import SetTitle from "../../../components/hooks/SetTitle";

const ProjectsWrapper = styled.div`
  width: 1144px;
  margin: 50px auto;
  display: flex;
  flex-wrap: wrap;

`



const Projects = (props) => {

    SetTitle('项目列表' )

    const [projects,  total,] = QueryProjects();


    return (
        <ProjectsWrapper>

            {
                projects.map((project, index) => <Item key={index} payload={project}  tag="项目"
                                                   buttonProps={
                                                       {
                                                           as: Link,
                                                           to: `/project/${project.url}`,
                                                           children: '进入项目'
                                                       }
                                                   }
                />)
            }

        </ProjectsWrapper>
    )
}

export default Projects;
