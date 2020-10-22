/*
* @file Content.jsx
* @author jansora
* @date 2020/2/20
*/


import React from "react";
import Production from "./production";
import styled from "styled-components";

const Wrapper = styled.main`
    height: 300px;
    width: 500px;
    margin: calc(50vh - 150px) auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Content = () => {

    return (
        <Wrapper>
            <Production/>
        </Wrapper>
    )
}

export default Content;
