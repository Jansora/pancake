/*
* @file Post.jsx
* @author jansora
* @date 2020/2/18
*/


import React, {useState} from "react";
import PostContent from "../../../../components/posts/PostContent";
import {Grid} from "semantic-ui-react";
import PostAnchor from "../../../../components/posts/PostAnchor";

const Post = (props) => {
    const {resource, setExpand} = props;

    const [Anchors, setAnchors] = useState([]);


    return (
        <Grid columns="equal" container style={{marginTop: 30}}>
            <Grid.Column width={12}>
                <PostContent resource={resource} setExpand={setExpand} setAnchors={setAnchors} />
            </Grid.Column>
            <Grid.Column width={3}>
                <PostAnchor Anchors={Anchors}  />
            </Grid.Column>
        </Grid>

    )
}

export default Post;
