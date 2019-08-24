import React from 'react';
import {Link, withRouter} from "react-router-dom";

import HorizontalTab from "../components/HorizontalTabs"
import Posts from "../pages/posts"
import {PageWrapper} from "../styles";


const labels  = [
    {label:'/post', value: 'aaaaa'},
    {label:'/topic', value: 'bbbbb'},
    {label:'/project', value: 'ccccc'},
]


const BootStrap = (props) => {

    const {location} = props;
    const index = labels.map(e => e.label).indexOf(location.pathname);
    const style = { width: "100%", height: 50, lineHeight: '50px'};
    return (
        <HorizontalTab
            centered
            active={index !== -1 ? index : 0}
            labels={labels.map(e=>   <Link to={e.label} style={style}>{e.value}</Link>)}
            tabs={[<PageWrapper children={<Posts/>}/>]}
            style={{position: 'fixed'}}
        />
    )

}


export default withRouter(BootStrap);