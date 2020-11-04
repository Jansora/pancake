import React from 'react';
import {Redirect, Route, withRouter} from "react-router-dom";
import {PageWrapper} from "../styles";

import Post from "../pages/post";
import Topic from "../pages/topic/";
import Project from "../pages/project";




const BootStrap = () => {


    return (
        <PageWrapper id='PageWrapper'>
            <Route path='/' exact render={() => <Redirect to="/post"/>}/>
            <Route
                path='/post'
                children={({match}) => match && <Post/>}
            />
            <Route
              path='/topic'
              children={({match}) => match && <Topic/>}
            />
            <Route
                path='/project'
                children={({match}) => match && <Project/>}
            />
        </PageWrapper>
    )

}



export default withRouter(BootStrap);