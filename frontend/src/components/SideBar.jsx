/*
* @file SideBar.jsx
* @author jansora
* @date 2020/2/17
*/


import React from "react";
import styled from "styled-components";
import {Sidebar as Aside, SidebarPushable, SidebarPusher} from "semantic-ui-react";

const StyledSidebarPushable = styled(SidebarPushable)`
  height: calc( 100vh - 50px )  !important;
  overflow: auto !important;
`

const StyledSideBarPusher = styled(SidebarPusher)`
  width: ${props => props.open ? 'calc( 100% - 260px )' : '100%'};

  height: calc( 100vh - 50px ) !important;

   overflow-y: auto !important;

`

const StyledSideBar = styled(Aside)`

`
const SideBar = (props) => {
    const {open, setOpen, aside, direction} = props;


    return (
        <SidebarPushable>
            <StyledSideBar
                animation='slide along'
                icon='labeled'
                direction={direction ? direction : 'left'}
                visible={open}
            >
                {aside}
            </StyledSideBar>

            <StyledSideBarPusher open={open}>
                {props.children}
            </StyledSideBarPusher>
        </SidebarPushable>
    )
}

export default SideBar;
