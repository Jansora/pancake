/*
* @file index.jsx
* @author jansora
* @date 2020/2/20
*/


import React from "react";
import {Route} from 'react-router-dom'
import localRouter from "./pages";
import styled from "styled-components";
import {CSSTransition} from 'react-transition-group'
import Scroll from "./scroll";
import IconBootstrap from "./IconBootstrap";

import p1 from '../assets/home.jpg'
import p2 from '../assets/blog.jpg'
import p3 from '../assets/topic.jpg'
import p4 from '../assets/project.jpg'

const Wrapper = styled.main`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;  
    background-image: url(${props => props.background});
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    >div>footer {
    position: fixed;
    text-align: center;
    
    bottom: 0;
    width: 100%;
    padding: 10px 0;
    a {
    color: white;
      }
}
`
const backgrounds = [
  p1,p2,p3,p4

]

const ImagePreLoad = styled.img`
  display: none;
`
const Bootstrap = () => {

    return (
      <Wrapper>
        <IconBootstrap />

        <Scroll/>
        {
          backgrounds.map(img => <ImagePreLoad src={img}/>)
        }
      {
          localRouter.routes.map((r, index) =>
            <Route key={index} path={r.path} exact={r.exact}>
                {
                    ({match}) => {
                        return <CSSTransition
                          in={match != null}
                          timeout={1000}
                          classNames="vertical"
                          unmountOnExit
                        >
                            <Wrapper className="vertical" background={backgrounds[index%4]}>
                                <r.component/>
                            </Wrapper>
                        </CSSTransition>
                    }
                }
            </Route>
          )
      }
      </Wrapper>
    )
}

export default Bootstrap;
