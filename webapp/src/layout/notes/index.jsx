import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Notes from "./notes";
import Note from "./note";
import ModifyNote from "./ModifyNote";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/05 12:19:04
 */

const Notebooks = (props) => {


  return <React.Fragment>
    <Switch>
      <Route path="/notes" component={Notes} exact={true}/>

      <Route path="/notes/new" component={ModifyNote} exact={true}/>
      <Route path="/notes/:id/edit" component={ModifyNote} exact={true} />

      <Route path="/notes/:id" component={Note} exact={true} />

    </Switch>
  </React.Fragment>;
}

export default Notebooks;
