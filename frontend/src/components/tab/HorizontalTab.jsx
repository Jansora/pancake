/*
* @file HorizontalTab.jsx
* @author jansora
*/
import React, {useState} from 'react';
import {Tab} from "semantic-ui-react";

import GetTheme from "../hooks/GetTheme";
import styled from "styled-components";

const StyledPane = styled(Tab)`
   div.ui.attached.segment{
    border: none;
  }
`

const HorizontalTab = (props) => {
  const {menus, panes, loading, onTabChange, style, activeIndex} = props;

  const [index, setIndex] = useState(0);
  const data = menus.map((menu, index) => {
    return {
      menuItem: menu,
      render: () => <Tab.Pane attached={true} loading={loading} basic>
        {
          panes[index]
        }
      </Tab.Pane>
    }
  });
  return <StyledPane
    style={style}
    menu={{ color: GetTheme(), secondary: true, pointing: true }}
    panes={data}
    activeIndex={activeIndex ? activeIndex : index}
    onTabChange={(event, { activeIndex }) => onTabChange ? onTabChange(activeIndex) : setIndex(activeIndex)}
  />

}
export default HorizontalTab;
