/*
* @file project.jsx
* @author jansora
* @date 2020/2/11
*/


import React, {useState} from "react";
import {QueryProject} from "../../../request/project";
import SetTitle from "../../../components/hooks/SetTitle";
import GetUser from "../../../components/hooks/GetUser";
import styled from "styled-components";
import {Icon, Loader} from "semantic-ui-react";
import EditProject from "../../../components/project/EditProject";


const Wrapper = styled.div`
  width: 80vw;
  height: calc(100vh - 50px);
  margin: 0 auto;
  overflow: hidden;
  > i {
    position: fixed;
    cursor: pointer;
    right: 10px;
    top: 60px;
  }
  iframe {
    width: 100%;
    height: calc(100% - 50px);
    margin-top: 25px;
    overflow:hidden;
  }
`

const Content = (props) => {

    const {resource} = props.match.params;

    const [loading, setLoading] = useState(true)

    const [openEditProject, setOpenEditProject] = useState(false)
    const [project, setProject] = QueryProject(resource)

    const user = GetUser();

    const isOwner = user && project && user.id === project.ownerId

    SetTitle(project.title)


    return (
        <Wrapper>
            {
                openEditProject && <EditProject project={project} setProject={setProject} editable={true} open={openEditProject} setOpen={setOpenEditProject} />
            }
            <Icon name='setting' size="large" onClick={() => setOpenEditProject(true)} />
            <Loader active={loading} content="加载中" />

            <iframe onLoad={() => setLoading(false)} src={project.iframe} allowFullScreen={true} frameBorder={0} scrolling="no"/>
        </Wrapper>

    )
}

export default Content;
