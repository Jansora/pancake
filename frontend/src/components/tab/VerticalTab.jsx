/*
* @file VerticalTab.jsx
* @author jansora
*/
import React, {useState} from 'react';

import {Grid} from "semantic-ui-react";
import styled from "styled-components";

const StyledAsideColumn = styled.aside`

    width: 140px;
    height: auto;

    overflow: hidden;

    border-right: #f3f3f3 solid 1px;
   
    display: flex;
    flex-direction: column;
    a {

      cursor: pointer;
      display: flex;
      height: 40px;
      line-height: 22px;
      outline: none;
      padding: 9px 20px;
      position: relative;
      user-select: none;
    }
    a:hover, a.active {
      border-radius: 4px;
      color: #383838;
      font-weight: bold;

      i {
        color: var(--primary-color);
      }
    }
    a:hover{
      background-color: hsla(0,0%,89.8%,.4);
    }
    a.active{
      background-color: var(--active-backgroud-color);
    }
    
`;
const VerticalTab = (props) => {


  const {menus, panes } = props;

  const [activeTab, setActiveTab] = useState(0);
  const togglePage = (event, index) => {
    event.preventDefault();
    setActiveTab(index)
  };
  return (
      <Grid columns='equal'>

        <Grid.Column width={3}>
          <StyledAsideColumn>
            {
              menus.map((tab, index) =>
                <a
                  key={index}
                  onClick={(event)=> togglePage(event, index)}
                  className={activeTab === index ? "active" : ""}
                >
                  {tab}
                </a>
              )
            }
          </StyledAsideColumn>
        </Grid.Column>
        <Grid.Column>
          {
            panes
              .filter((pane, index) => activeTab === index)
              .map((pane, index) => {return {...pane, key: index}})
          }

        </Grid.Column>

      </Grid>
  )
}
export default VerticalTab;
