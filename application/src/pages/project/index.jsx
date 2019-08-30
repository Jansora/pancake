import React, {} from 'react';

import {Route, withRouter} from 'react-router-dom';


import PS from './projects'
import P from "./project"


const Project = (props) => {
  
  return (
        <React.Fragment>
            <Route
              exact
              path='/project'
              children={({match}) => match && <PS breadcrumb={props.breadcrumb}/>}
            />
            <Route
                exact
                path='/project/:url'
                children={({match}) => match && <P breadcrumb={props.breadcrumb}/>}
            />

        </React.Fragment>
    )

}

export default withRouter(Project);
