import React from 'react';

import {Route, withRouter} from 'react-router-dom';


import PS from './ps'
import P from './p'


const Posts = () => {

    return (
        <React.Fragment>
            <Route
              exact
              path='/post'
              children={({match}) => match && <PS/>}
            />
            <Route
              path='/post/:url'
              children={({match}) => match && <P/>}
            />

        </React.Fragment>
    )

}

export default withRouter(Posts);
