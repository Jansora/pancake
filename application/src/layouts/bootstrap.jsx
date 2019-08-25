import React, {useEffect} from 'react';
import {Link, withRouter, Redirect,Route} from "react-router-dom";

import HorizontalTab from "../components/BootStrapTab"
import Posts from "../pages/post"
import {PageWrapper} from "../styles";


const labels  = [
    {label:'/post', value: '博客'},
    {label:'/topic', value: '专栏'},
    {label:'/project', value: '项目'},
]

const BootStrap = (props) => {

    const {location} = props;
    const index = labels.map(e => e.label).indexOf(location.pathname);
    const style = { width: "100%", height: 50, lineHeight: '50px'};


    return (
        <React.Fragment>


                <Route path='/' exact render={() => <Redirect to="/post"/>}/>


                <HorizontalTab
                    bootstrap
                    centered
                    active={index !== -1 ? index : 0}
                    labels={labels.map(e => <Link to={e.label} style={style}>{e.value}</Link>)}
                    tabs={[<PageWrapper children={<Posts breadcrumb={[labels[index !== -1 ? index : 0]]}/>}/>]}
                    style={{position: 'fixed'}}
                />

        </React.Fragment>
    )

}



export default withRouter(BootStrap);