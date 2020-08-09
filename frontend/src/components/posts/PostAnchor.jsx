/*
* @file PostAnchor.jsx
* @author jansora
* @date 2020/2/20
*/


import React from "react";
import {Anchor} from "antd";
import styled from "styled-components";


const AnchorWrapper = styled(Anchor)`

  position: fixed;
  top: 107px;
  height: 60vh;
  overflow: auto;
  background: none;
    // 覆写 ant design锚点
  .ant-anchor-ink-ball{
    border: 2px solid var(--primary-color) !important;
  }
  .ant-anchor-link-active > .ant-anchor-link-title{
    color: var(--primary-color) !important;

  }
  a.ant-anchor-link-title{
      font-size: 12px;
  }
  
  ul.property{
        font-size: 12px;
  }
`

const PostAnchor = (props) => {
    const { Anchors } = props;

    return (
        <AnchorWrapper affix={true} onClick={(e, f) => null} offsetTop={170} {...props}>
            {
                Anchors.map((e, index) => {
                    return <Anchor.Link
                        key={index} href={`#${e.id}`}
                        title={
                            <span style={{
                                marginLeft: 14 * (parseInt(e.id[8]) - 1),
                                fontWeight: e.id[8] === "1" ? "bold" : "normal"
                            }}>{e.text}</span>
                        }
                    />
                })
            }
            <Anchor.Link
                href={`#Comments`} style={{marginLeft: 20}}
                title={<span style={{marginLeft: 0, fontWeight: "bold"}}>评论栏</span>}
            />
        </AnchorWrapper>
    )
}

export default PostAnchor;
