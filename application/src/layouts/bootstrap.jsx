import React from 'react';
import {Redirect, Route, withRouter} from "react-router-dom";

import {PageWrapper} from "../styles";
import Post from "../pages/post";

import Topic from "../pages/topic/"
import Project from "../pages/project"

const labels  = [
    {label:'/post', value: '博客'},
    {label:'/topic', value: '专栏'},
    {label:'/project', value: '项目'},
]

const BootStrap = (props) => {

    const {location} = props;
    const label = labels.filter(e => location.pathname.startsWith(e.label));

    const breadcrumb = label.length > 0 ? label : labels[0];

    return (
        <PageWrapper id='PageWrapper'>
          
            <Route path='/' exact render={() => <Redirect to="/post"/>}/>
            <Route
                path='/post'
                children={({match}) => match && <Post breadcrumb={breadcrumb}/>}
            />


            <Route
              path='/topic'
              children={({match}) => match && <Topic breadcrumb={breadcrumb}/>}
            />
            <Route
                path='/project'
                children={({match}) => match && <Project breadcrumb={breadcrumb}/>}
            />


          {/*<BootStrapTab*/}
                {/*    bootstrap*/}
                {/*    centered*/}
                {/*    active={index !== -1 ? index : 0}*/}
                {/*    labels={labels.map(e => <Link to={e.label} style={style}>{e.value}</Link>)}*/}
                {/*    tabs={[]}*/}
                {/*    style={{position: 'fixed'}}*/}
                {/*/>*/}

        </PageWrapper>
    )

}



export default withRouter(BootStrap);