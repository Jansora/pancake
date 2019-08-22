import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import localRouter from "./localRouter";

export const Projects = () => {
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
