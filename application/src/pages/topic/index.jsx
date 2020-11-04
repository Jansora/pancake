import React from 'react';

import {Route, withRouter} from 'react-router-dom';


import TS from './topics'
import T from '../topic/topic'

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
