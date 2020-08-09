/*
* @file BackgroundImage.jsx
* @author jansora
* @date 2020/2/20
*/


import React from "react";
import styled from "styled-components";

const BackgroundImage = styled.div`
    width: 100%;
    height: 100%;
    display: block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    ${props => props.background ? 'background-image: url('+props.background+')  !important;': ''}
`


export default BackgroundImage;