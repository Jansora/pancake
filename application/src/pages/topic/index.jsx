import React, {} from 'react';

import {Route, withRouter, Redirect, Switch} from 'react-router-dom';


import TS from './topics'
import T from '../topic/topic'


import {classes} from "../../utils/Router";

const Topics = (props) => {
  
  return (
        <React.Fragment>
            <Route
              exact
              path='/topic'
              children={({match}) => match && <TS breadcrumb={props.breadcrumb}/>}
            />
            <Route
              path={'/topic/:topic/:url'}
              children={({match}) => match && <T breadcrumb={props.breadcrumb}/>}
            />
        </React.Fragment>
    )

}

export default withRouter(Topics);
