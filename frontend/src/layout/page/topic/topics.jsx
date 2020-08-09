/*
* @file projects.jsx
* @author jansora
* @date 2020/2/17
*/


import React from "react";

import {Link} from 'react-router-dom'
import {QueryTopics} from "../../../request/topic";
import Item from "../../../components/Item";
import styled from "styled-components";
import SetTitle from "../../../components/hooks/SetTitle";

const TopicsWrapper = styled.div`
  width: 1144px;
  margin: 50px auto;
  display: flex;
  flex-wrap: wrap;

`



const Topics = (props) => {
    SetTitle('专栏列表' )


    const [topics,  total,] = QueryTopics();



    return (
        <TopicsWrapper>

            {
                topics.map((topic, index) => <Item key={index} payload={topic}  tag="专栏"
                                                   buttonProps={
                                                       {
                                                           as: Link,
                                                           to: `/topic/${topic.url}`,
                                                           children: '进入专栏'
                                                       }
                                                   }
                />)
            }

        </TopicsWrapper>
    )
}

export default Topics;
