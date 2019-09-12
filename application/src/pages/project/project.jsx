import React, {useEffect} from 'react';

import {withRouter} from 'react-router-dom';


import {IFrame, Loading} from "../../styles/project";
import {client} from "../../utils/requests";
import connect from "react-redux/es/connect/connect";

import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";

moment.locale('zh-CN');



const Project = (props) => {
  const dispatch = (type, payload) => props.dispatch({type, payload});


  const [breadcrumb, setBreadcrumb] = React.useState([{label:'/project', value: '项目'}]);

  const {url} = props.match.params;
  const matchUrl = props.match.url;

  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  
  useEffect(()=>{
    setLoading(true)
    client.get(`/Project/${url}`)
      .then(r => {
          if (r.data.ret) {
            const data = r.data.res;
            setData(data)
            setBreadcrumb(breadcrumb => breadcrumb.concat([{label: matchUrl, value: data.Name}]))

          }
          
        }
      ).catch(e => {
      console.log(e);
    }).finally(()=> {
      setLoading(false)
    })
    
  }, [url, matchUrl]);

  dispatch('breadcrumb', breadcrumb);

  return (
        <>
          {
            loading && <Loading><CircularProgress  /></Loading>
          }

            {
              data.hasOwnProperty('Frame') &&
                <IFrame frameBorder='no'  src={data.Frame} />

            }
  

          
        </>
    )

}

const mapStateToProps = state => ({

});
export default connect(
  mapStateToProps,
)(withRouter(Project));

