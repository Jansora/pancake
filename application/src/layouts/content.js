import React from 'react';

import {Route, Switch, Redirect, withRouter} from "react-router-dom";
import './assets/content.less';
import localRouter from "./localRouter";

class Content extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Switch>
          {localRouter.redirects.map((e, index) => <Redirect key={index} {...e}/>)}
          {localRouter.routes.map((e, index) => <Route key={index} {...e}/>)}
          {<Route component={localRouter.container} />}
        </Switch>
      </React.Fragment>
    )
  }
}

export default withRouter(Content);