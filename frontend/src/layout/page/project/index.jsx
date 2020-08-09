/*
* @file index.jsx
* @author jansora
* @date 2020/2/16
*/


import React from "react";
import Content from "./Content";
import {Route, Switch} from "react-router-dom";
import Projects from "./projects";

const Project = () => {

    return (
            <Switch>
                <Route path="/project" component={Projects} exact={true}/>
                <Route path="/project/:resource" component={Content} exact={false}/>
            </Switch>
    )
}

export default Project;
