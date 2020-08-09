/*
* @file post.jsx
* @author jansora
* @date 2020/2/11
*/


import React, {useEffect, useState} from "react";
import {Grid, Icon} from "semantic-ui-react";
import PostContent from "../../../components/posts/PostContent";
import Catalog from "./Catalog";
import SideBar from "../../../components/SideBar";
import {QueryPost} from "../../../request/post";
import SetTitle from "../../../components/hooks/SetTitle";
import styled from "styled-components";


const StyledTopicSideBarControlIcon = styled(Icon)`
  position: absolute !important;
  font-size: 20px !important;
  cursor: pointer !important;
  padding: 10px;
  display: block;
  width: 40px;
  height: 40px;
  z-index: 1;

`


const PostWrapper = (props) => {

    const {resource} = props.match.params;
    const [Anchors, setAnchors] = useState([]);
    const [displayCatalog, setDisplayCatalog] = useState(true);


    const updateToc = () => {
        setTimeout(() => {
            const article = document.querySelector(".custom-html-style");
            if(null == article) return;
            const hs = article.querySelectorAll("h1,h2,h3,h4,h5,h6");
            const Anchor = [];

            hs.forEach((item, index) => {
                const h = item.nodeName.substr(0, 2).toLowerCase()
                item.id = `Anchor-${h}-${index}`;
                Anchor.push({id: `Anchor-${h}-${index}`, text: item.textContent});
            })
            setAnchors(Anchor)
        }, 100);
    }

    const [post, setPost, loading, setLoading] = QueryPost(resource)



    useEffect(() => {
        updateToc()
    }, [post])

    SetTitle(post.title)

    return (
        <SideBar
            open={displayCatalog} setOpen={setDisplayCatalog}
            aside={
                <Catalog
                    post={post}
                    Anchors={Anchors}
                    visible={displayCatalog}
                />
            }
        >
            <StyledTopicSideBarControlIcon
                name={`${displayCatalog ? "reply" : "share"}`}
                onClick={()=> setDisplayCatalog(!displayCatalog)}
            />
            <Grid
                style={{height: "calc( 100vh - 34px )", overflowY: "auto", margin: "-1rem 0"}}
                // style={{height: "calc( 100vh - 34px )", overflowY: "auto", margin: "-1rem 0"}}
                columns='equal'
            >
                <Grid.Column/>
                <Grid.Column width={14}>
                    <PostContent resource={resource} topic={null} setAnchors={setAnchors}/>
                </Grid.Column>
                <Grid.Column/>
            </Grid>
        </SideBar>
    )
}

export default PostWrapper;
