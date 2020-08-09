/*
* @file production.jsx
* @author jansora
* @date 2020/2/20
*/


import React, {useEffect, useRef, useState} from 'react'
import {animated, config, useChain, useSpring, useTransition} from 'react-spring'
import styled from "styled-components";
import {Link} from "react-router-dom";


const Item = styled(animated.div)`
  width: 100px;
  height: 50px;
  background: none;
  border-radius: 5px;
  box-shadow: 0px 0px 16px 10px white;
  will-change: width, height;
  
  margin: 15px;
  a {
    color: white;

    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    justify-content: center;
    span {}
    
  }
  a:hover{
    color: #a8edea;
  }
`

const Container = styled(animated.div)`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  color: white;
  height: 40px;
  line-height: 40px;
  background: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 0px 16px 10px white;
  will-change: width, height;
`

const data =  [
    {
        name: '1',
        component: <Link to={"/post"}><span>博客</span></Link>,
    },
    {
        name: '2',
        component: <Link to={"/topic"}><span>专栏</span></Link>,
    },
    {
        name: '3',
        component: <Link to={"/project"}><span>项目</span></Link>,
    },

    {
        name: '5',
        component: <Link to={"/feedback"}><span>留言板</span></Link>,
    },
    {
        name: '6',
        component: <Link to={"/concat"}><span>联系我</span></Link>,
    },
    ]
const Production = (props) => {
    const [open, set] = useState(false)

    const springRef = useRef()
    const { width, height, opacity, ...rest } = useSpring({
        ref: springRef,
        config: config.stiff,
        from: { width: 100, height: 40 },
        to: { width: open ? 400 : 100, height: open ? 200 : 40}
    })

    const transRef = useRef()
    const transitions = useTransition(open ? data : [], item => item.name, {
        ref: transRef,
        unique: true,
        // trail: 400 / data.length,
        from: { opacity: 0, transform: 'scale(0)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { opacity: 0, transform: 'scale(0)' }
    })

    // This will orchestrate the two animations above, comment the last arg and it creates a sequence
    useChain(open ? [springRef, transRef] : [transRef, springRef], [0, open ? 0.1 : 0.6])

    const [font, setFont] = useState("我的应用")

    useEffect(()=> {
        if(!open) {
            setTimeout(()=>setFont("我的应用"), 1000)
        } else {
            setFont("")
        }
    }, [open])

    return (
        <>
            <div />
            <Container style={{ ...rest, width, height }} onClick={() => set(open => !open)} onBlur={()=> set(false)}>
                {!open && font}
                {transitions.map(({ item, key, props }) => (
                    <Item key={key} style={{ ...props}} >
                        {item.component}

                    </Item>
                ))}
            </Container>
        </>
    )
}

export default Production;
