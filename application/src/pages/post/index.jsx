import React from 'react';

import {Redirect, Route, withRouter} from 'react-router-dom';


import PS from './ps'
import P from './p'


import {classes} from "../../utils/Router";

const Posts = (props) => {

  const breadcrumb = props.breadcrumb.concat(classes.filter(e => props.location.pathname.indexOf(e.label) !== -1 ));

  return (
        <React.Fragment>
            <Route path='/post' exact render={() => <Redirect to="/post/all"/>}/>
           
            <Route
              exact
              path={classes.map(_class => _class.label)}
              children={({match}) => match && <PS breadcrumb={breadcrumb}/>}
            />
            <Route
              path={classes.map(_class => _class.label + '/:url')}
              children={({match}) => match && <P breadcrumb={breadcrumb}/>}
            />
            
        </React.Fragment>
    )

}

export default withRouter(Posts);
