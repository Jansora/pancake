import React, {useEffect} from 'react';

import {Link, withRouter} from 'react-router-dom';


import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Grid} from "@material-ui/core";


import {Content, Loading, TopicWrapper} from "../../styles/topic";
import {client} from "../../utils/requests";


import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import {Store} from "../../utils/store";

moment.locale('zh-CN');



const Topics = (props) => {

  const {dispatch} = React.useContext(Store);

  const {url} = props.match;
  

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    dispatch({type: 'breadcrumb', payload: [{label:'/topic', value: '专栏'}]})
  }, [dispatch]);

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
                const urls = e.ArticleObjects.filter(e => e.Id !== 0);
                console.log(urls, e)
                return <Grid component='div' item xs={4} key={e.Url}>
                
                    <Card className={classes.card} >
                      <CardMedia
                        className={classes.media}
                        image={e.Logo_url}
                        title={e.Description}
                        component={Link} to={`${url}/${e.Url}/${urls.length > 0 ? urls[0].Url : null}`}
                      />
                      <Content>
                        <Link to={`${url}/${e.Url}/${urls.length > 0 ? urls[0].Url : null}`} className='title'>  {e.Name}</Link>
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


export default (withRouter(Topics));

