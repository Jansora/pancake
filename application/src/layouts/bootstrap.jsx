import React, {} from 'react';
import {Link, withRouter, Redirect,Route} from "react-router-dom";

import BootStrapTab from "../components/BootStrapTab"
import Posts from "../pages/post"
import {PageWrapper} from "../styles";
import {classes} from "../utils/Router";
import PS from "../pages/post/ps";
import P from "../pages/post/p";
import Topic from "../pages/topic"

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
            <Route path='/post' exact render={() => <Redirect to="/post/all"/>}/>
         
            <Route
              exact
              path={classes.map(_class => _class.label)}
              children={({match}) => match && <PS breadcrumb={breadcrumb}/>}
            />
            <Route
              path={classes.map(_class => _class.label + '/:url')}
              children={({match}) => match && <P breadcrumb={breadcrumb}/>}
            />
            <Route
              path='/topic'
              children={({match}) => match && <Topic breadcrumb={breadcrumb}/>}
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