/*
* @file index.jsx
* @author jansora
* @date 2020/2/16
*/


import React from "react";
import Content from "./Content";
import {Route, Switch} from "react-router-dom";
import Topics from "./topics";
import EditPost from "../../../components/posts/EditPost";

const Topic = (props) => {

    return (
            <Switch>
                <Route path="/topic" component={Topics} exact={true}/>
                <Route path="/topic/:topic/:resource/edit" component={EditPost} exact={false}/>
                <Route path="/topic/:resource/:sub" component={Content} exact={false}/>
                <Route path="/topic/:resource" component={Content} exact={false}/>
            </Switch>
    )
}

export default Topic;
