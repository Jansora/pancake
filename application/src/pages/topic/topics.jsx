import React, {useEffect} from 'react';

import {Link, withRouter} from 'react-router-dom';


import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Grid} from "@material-ui/core";


import {Content, Loading, TopicWrapper} from "../../styles/topic";
import {client} from "../../utils/requests";
import connect from "react-redux/es/connect/connect";

import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";

moment.locale('zh-CN');



const Topics = (props) => {
  const dispatch = (type, payload) => props.dispatch({type, payload});

  const breadcrumb = [{label:'/topic', value: '专栏'}];
  
  dispatch('breadcrumb', breadcrumb);
  const {url} = props.match;
  
  // const [Id, setId] = React.useState('');
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  
  useEffect(()=>{
    setLoading(true)
    client.get(`/Topic`)
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
    
  }, [url]);
  
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
        <TopicWrapper>
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
                        component={Link} to={`${url}/${e.Url}/${e.ArticleObjects[0].Url}`}
                      />
                      <Content>
                        <Link to={`${url}/${e.Url}/${e.ArticleObjects[0].Url}`} className='title'>  {e.Name}</Link>
                        <span className='date'>{moment(e.Create_time).fromNow()}</span>
                        {/*<p> {e.Description}</p>*/}
                      </Content>
                      
                    </Card>
              
                  
                </Grid>
              })
            }
  
            
          </Grid>
          
        </TopicWrapper>
    )

}

const mapStateToProps = state => ({

});
export default connect(
  mapStateToProps,
)(withRouter(Topics));

