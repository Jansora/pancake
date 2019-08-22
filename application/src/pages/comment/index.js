import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import './assets/demo.less';
import localRouter from "./localRouter";

export const Comment = () => {
  return (
    <React.Fragment>
      <Switch>
        {localRouter.redirects.map((e, index) => <Redirect key={index} {...e}/>)}
        {localRouter.routes.map((e, index) => <Route key={index} {...e}/>)}
        {<Route component={localRouter.container} />}
      </Switch>
    </React.Fragment>
  );
};

