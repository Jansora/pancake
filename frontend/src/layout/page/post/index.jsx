/*
* @file index.jsx
* @author jansora
* @date 2020/2/5
*/


import React from "react";

import {Redirect, Route, Switch} from "react-router-dom";

import Posts from "./posts"
import PostWrapper from "./post";
import EditPost from "../../../components/posts/EditPost";

const Post = () => {

    return (
        <Switch>
            <Redirect from='/' to='/workspaces/groups' exact={true}/>
            <Route path="/post" component={Posts} exact={true}/>
            <Route path="/post/new" component={EditPost} exact={true}/>
            <Route path="/post/:resource/edit" component={EditPost} exact={true}/>

            <Route path="/post/:resource" component={PostWrapper} exact={false}/>
        </Switch>
    )

}

export default Post;
