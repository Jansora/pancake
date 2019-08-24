import React from 'react';
import {Grid} from "@material-ui/core";
import {PostsWrapper, TagsWrapper, FilterWrapper} from "../styles/posts";
import connect from "react-redux/es/connect/connect";
import Chip from '@material-ui/core/Chip';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


import {Icon} from "react-fa";

const Posts = (props) => {
    const dispatch = (type, payload) => props.dispatch({type, payload});
    dispatch('breadcrumb', [{label:"aaa", link:'aaa'},{label:"bbb", link:'bbb'}]);
    const [language, setLang] = React.useState(false);
    
    
    
    
    return (
        <PostsWrapper>
          <Grid container justify={'space-around'} component='div' spacing={4}>
            <Grid component='div' item xs={3}>
              <TagsWrapper>
                {/*<h1>adsadsas</h1>*/}
                <List component="ul">
                  <ListItem button component='li'  onClick={()=> setLang(!language)}>
                    <ListItemIcon>
                      <Icon name="github"/>
                    </ListItemIcon>
                    <ListItemText primary="Language" />
                    {language ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={language} timeout="auto" unmountOnExit>
                    <List component={Link} to={'/posts/python'} disablePadding>
                      <ListItem button style={{paddingLeft: 55}}>
                        <ListItemText primary="python" />
                      </ListItem>
                    </List>
                  </Collapse>
                  {/*<Divider />*/}
                  <ListItem button>
                    <ListItemIcon>
                      <Icon name="github"/>
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                  </ListItem>
                </List>
 
                <List component="nav" aria-label="secondary mailbox folders">
                  <ListItem button>
                    <ListItemText primary="Trash" />
                  </ListItem>
                  <ListItem href="#simple-list">
                    <ListItemText primary="Spam" />

                  </ListItem>
                </List>
     
                {/*<Chip variant="outlined" color="primary" label={'aaaaa'} />*/}
                {/*<Chip variant="outlined" color="primary" label={'aaaaa'} />*/}
                {/*<Chip variant="outlined" color="primary" label={'aaaaa'} component='li' />*/}
              </TagsWrapper>
              <h1>...</h1>
              <p>......</p>
            </Grid>
            <Grid component='div' item xs={9}>
              <FilterWrapper>
                <Divider style={{margin: '10px 0'}}/>
                <Chip variant="outlined" color="primary" label={'aaaaa'} />
                <Chip variant="outlined" color="primary" label={'aaaaa'} />
                <Chip variant="outlined" color="primary" label={'aaaaa'} />
                <Chip variant="outlined" color="primary" label={'aaaaa'} />
                <Chip variant="outlined" color="primary" label={'aaaaa'} />
              </FilterWrapper>


            </Grid>
          </Grid>;
        </PostsWrapper>
    )

}

const mapStateToProps = state => ({

});
export default connect(
  mapStateToProps,
)(Posts);
