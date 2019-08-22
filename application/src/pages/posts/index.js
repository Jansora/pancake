import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import localRouter from "./localRouter";

export const Posts = () => {
  return (
    <React.Fragment>
      <main>
        <Switch>
          {localRouter.redirects.map((e, index) => <Redirect key={index} {...e}/>)}
          {localRouter.routes.map((e, index) => <Route key={index} {...e}/>)}
          {<Route component={localRouter.container} />}
        </Switch>
      </main>
    </React.Fragment>
  );
};

