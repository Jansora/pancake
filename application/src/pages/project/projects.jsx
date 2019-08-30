import React, {useEffect} from 'react';

import {Route, withRouter, Redirect, Switch, Link} from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Button} from "@material-ui/core";
import {Grid} from "@material-ui/core";


import {ProjectsWrapper, Loading, Content} from "../../styles/project";
import {classes} from "../../utils/Router";
import {client} from "../../utils/requests";
import connect from "react-redux/es/connect/connect";

import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";

moment.locale('zh-CN');



const Projects = (props) => {
  const dispatch = (type, payload) => props.dispatch({type, payload});

  const breadcrumb = [{label:'/project', value: '项目'}];
  
  dispatch('breadcrumb', breadcrumb);


  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  
  useEffect(()=>{
    setLoading(true)
    client.get(`/Project`)
      .then(r => {
          if (r.data.ret) {
            const data = r.data.res;
            setData(data)
          }
          
        }
      ).catch(e => {
      console.log(e);
    }).finally(()=> {
      setLoading(false)
    })
    
  }, []);
  
  const useStyles = makeStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  const classes = useStyles();

  return (
        <ProjectsWrapper>
          {
            loading && <Loading><CircularProgress  /></Loading>
          }
          <Grid container component='div' spacing={5}>
            {
              data.map(e=> {
                return <Grid component='div' item xs={4} key={e.Url}>
                
                    <Card className={classes.card} >
                      <CardMedia
                        className={classes.media}
                        image={e.Logo_url}
                        title={e.Description}
                        component={Link} to={`/project/${e.Url}`}
                      />
                      <Content>
                        <Link to={`/project/${e.Url}}`} className='title'>  {e.Name}</Link>
                        <span className='date'>{moment(e.Create_time).fromNow()}</span>
                        {/*<p> {e.Description}</p>*/}
                      </Content>
                      
                    </Card>
              
                  
                </Grid>
              })
            }
  
            
          </Grid>
          
        </ProjectsWrapper>
    )

}

const mapStateToProps = state => ({

});
export default connect(
  mapStateToProps,
)(withRouter(Projects));

