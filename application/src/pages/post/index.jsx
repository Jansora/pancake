import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {PostsWrapper, MenuWrapper, FilterWrapper, ContentWrapper} from "../../styles/posts";
import connect from "react-redux/es/connect/connect";
import Chip from '@material-ui/core/Chip';
import {NavLink, Route, Link, withRouter, Redirect, Switch} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Avatar from '@material-ui/core/Avatar';

import {Icon} from "react-fa";

import PS from './ps'
import P from './p'


import {classes} from "../../utils/Router";

const Posts = (props) => {

  const breadcrumb = props.breadcrumb.concat(classes.filter(e => props.location.pathname.indexOf(e.label) !== -1 ));

  return (
        <PostsWrapper>

              <Route path='/post' exact render={() => <Redirect to="/post/all"/>}/>
              <Route path={classes.map(_class => _class.label)}  exact>
                {
                  ({match}) => match && <PS breadcrumb={breadcrumb} />
                }
              </Route>

          {/*<Route path={labels.map(_class => _class.label)}  component={<P breadcrumb={breadcrumb} />}/>*/}
        </PostsWrapper>
    )

}

const mapStateToProps = state => ({
  // breadcrumb: state.breadcrumb
});
export default connect(
  mapStateToProps,
)(withRouter(Posts));
