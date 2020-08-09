/*
* @file index.jsx
* @author jansora
* @date 2020/2/5
*/


import React from "react";
import {Route, Switch} from "react-router-dom"
import {LayoutWrapper} from "../../styled/layout";
import Post from "../page/post";
import Feedback from "../page/feedback";
import Topic from "../page/topic";
import Hooks from "../../components/hooks";
import User from "../page/user";
import Project from "../page/project";
import Playground from "../page/playground";

const Layout = (props) => {

    return (
        <React.Fragment>

            <LayoutWrapper>
                <Switch>
                    <Route path="/post" component={Post} exact={false}/>
                    <Route path="/topic" component={Topic} exact={false}/>
                    <Route path="/project" component={Project} exact={false}/>
                    <Route path="/feedback" component={Feedback} exact={false}/>
                    <Route path="/playground" component={Playground} exact={false}/>
                    <Route path="/user/:id" component={User} exact={false}/>

                </Switch>
            </LayoutWrapper>
            <Hooks/>
            {/*<Background/>*/}
        </React.Fragment>

    )
}

export default Layout;
