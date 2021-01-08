/*
* @file index.jsx
* @author jansora
* @date 2020/2/16
*/


import React from "react";
import {Route, Switch} from "react-router-dom";
import {useTitle} from "ahooks";
import Apps from "./apps";
import GeoGebra from "./apps/GeoGebra";


const InnerApps = (props) => {

    useTitle("应用商店")
    return (
        <React.Fragment>
            <Switch>
            <Route path="/app-store" component={Apps} exact={true}/>
            <Route path="/app-store/GeoGebra" component={GeoGebra} exact={true} />
            </Switch>
        </React.Fragment>
    )
}

export default InnerApps;
