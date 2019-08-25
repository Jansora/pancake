import React from 'react';
import {Grid} from "@material-ui/core";
import {PostsWrapper, MenuWrapper, FilterWrapper, ContentWrapper} from "../../styles/posts";
import connect from "react-redux/es/connect/connect";
import Chip from '@material-ui/core/Chip';
import {NavLink, Route, Link, withRouter} from 'react-router-dom';
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



const PS = (props) => {
    const dispatch = (type, payload) => props.dispatch({type, payload});

    dispatch('breadcrumb', [{label:"aaa", value:'aaa'},{label:"bbb", value:'bbb'}]);
    const {location} = props;
    const [loading, setLoading] = React.useState(false);
    const [sortType, setSortType] = React.useState('title');
    const [sort, setSort] = React.useState('desc');



  return (
        <PostsWrapper>

        </PostsWrapper>
    )

}

const mapStateToProps = state => ({

});
export default connect(
  mapStateToProps,
)(withRouter(PS));
