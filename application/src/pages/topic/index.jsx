import React, {} from 'react';

import {Route, withRouter, Redirect, Switch} from 'react-router-dom';


import Topic from './topic'
import P from '../post/p'


import {classes} from "../../utils/Router";

const Topics = (props) => {
  
  return (
        <React.Fragment>
            <Route
              exact
              path='/topic'
              children={({match}) => match && <Topic breadcrumb={props.breadcrumb}/>}
            />
            <Route
              path={'/topic/:topic/:url'}
              children={({match}) => match && <P breadcrumb={props.breadcrumb}/>}
            />
        </React.Fragment>
    )

}

export default withRouter(Topics);
