import React, {useEffect} from 'react';

import {withRouter} from 'react-router-dom';


import {IFrameWrapper, IFrame, Loading} from "../../styles/project";
import {client} from "../../utils/requests";


import CircularProgress from "@material-ui/core/CircularProgress";


import Tooltip from "@material-ui/core/Tooltip";
import {Store} from "../../utils/store";




const Project = (props) => {

  const {dispatch} = React.useContext(Store);
  const {location} = props;

  const {url} = props.match.params;
  const matchUrl = props.match.url;

  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const breadcrumb = [{label:'/project', value: '项目'}]
    data.hasOwnProperty('Name')
        ? breadcrumb.push({label: location.pathname, value: data.Name})
        : breadcrumb.push({label: location.pathname, value: '加载中'})
    dispatch({type: 'breadcrumb', payload: breadcrumb})
  }, [dispatch, data, location.pathname]);

  useEffect(()=>{
    setLoading(true);
    client.get(`/Project/${url}`)
      .then(r => {
          if (r.data.ret) {
            setData(r.data.res);
          }
        }
      ).catch(e => {
        console.error(e)
    }).finally(()=> {
      setLoading(false)
    })
    
  }, [url, matchUrl]);


  return (
        <>
          {
            loading && <Loading><CircularProgress  /></Loading>
          }
          <IFrameWrapper>
            <Tooltip title={data.hasOwnProperty('Frame') ? data.Frame : ''}>
              <h1>
                { data.Name}
                <a
                    style={{margin: '0 10px'}}
                    target='_blank' rel='noopener noreferrer' href={data.Frame}>
                  在新窗口打开
                </a>
              </h1>
            </Tooltip>
            <p>{data.Description}</p>
            {
              data.hasOwnProperty('Frame') &&
                <IFrame
                    frameborder="no"  marginwidth="0" marginheight="0" scrolling="no"
                    src={data.Frame} />
            }
  
          </IFrameWrapper>
          
        </>
    )

}

export default withRouter(Project);

