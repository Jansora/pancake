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
import {formatTime} from "../../utils/utils";
import {useMediaQuery} from "react-responsive";
import {desktopStyle} from "../../utils/constants";

moment.locale('zh-CN');



const Topics = (props) => {

  const isDesktop = useMediaQuery({query: desktopStyle});

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
            setData(data);
            dispatch({
              type: 'message',
              payload: {open: true, variant: 'success', content: `数据获取成功, 共有 ${data.length} 个专栏`, duration: 1000}
            })
          } else {
            dispatch({
              type: 'message',
              payload: {open: true, variant: 'error', content: r.data.res, duration: 2000}
            })
          }
          
        }
      ).catch(e => {
      dispatch({
        type: 'message',
        payload: {open: true, variant: 'error', content: '服务器异常或网络异常', duration: 2000}
      });
      console.log(e);
    }).finally(()=> {
      setLoading(false)
    })
    
  }, [url, dispatch]);
  
  const useStyles = makeStyles({
    card: {
      // maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  const classes = useStyles();

  return (
        <TopicWrapper isDesktop={isDesktop}>
          {
            loading && <Loading><CircularProgress  /></Loading>
          }
          <Grid container component='div' spacing={isDesktop ? 5 : 2} justify="space-around">
            {
              data.map(e=> {
                const urls = e.ArticleObjects.filter(e => e.Id !== 0);
                return <Grid component='div' item xs={isDesktop ? 3 : 5}
                             key={e.Url} >
                
                    <Card className={classes.card} >
                      <CardMedia
                        className={classes.media}
                        image={e.Logo_url}
                        title={e.Description}
                        component={Link} to={`${url}/${e.Url}/${urls.length > 0 ? urls[0].Url : null}`}
                      />
                      <Content>
                        <Link to={`${url}/${e.Url}/${urls.length > 0 ? urls[0].Url : null}`} className='title'>  {e.Name}</Link>
                        <span className='date'>最后更新于 {moment(formatTime(e.Modify_time)).fromNow()}</span>
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

