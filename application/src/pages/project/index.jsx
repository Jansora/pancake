import React from 'react';

import {Route, withRouter} from 'react-router-dom';


import PS from './projects'
import P from "./project"


const Project = (props) => {
  
  return (
        <React.Fragment>
            <Route
              exact
              path='/project'
              children={({match}) => match && <PS />}
            />
            <Route
                exact
                path='/project/:url'
                children={({match}) => match && <P />}
            />

        </React.Fragment>
    )

}

export default withRouter(Project);
