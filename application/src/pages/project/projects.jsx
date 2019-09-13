import React, {useEffect} from 'react';

import {Link, withRouter} from 'react-router-dom';


import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Grid} from "@material-ui/core";


import {Content, Loading, ProjectsWrapper} from "../../styles/project";
import {client} from "../../utils/requests";

import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import {Store} from "../../utils/store";

moment.locale('zh-CN');



const Projects = (props) => {
  const {dispatch} = React.useContext(Store);


  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);


  useEffect(() => {
    dispatch({type: 'breadcrumb', payload: [{label:'/project', value: '项目'}]})
  }, [dispatch]);


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
                        <Link to={`/project/${e.Url}`} className='title'>  {e.Name}</Link>
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

export default (withRouter(Projects));

