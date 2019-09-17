import React, {useEffect, useState} from 'react';

import {Route, withRouter} from 'react-router-dom';

import P from '../post/p'
import {client} from "../../utils/requests";
import {Store} from "../../utils/store";


const Topic = (props) => {


    const {topic} = props.match.params;
    const [Topic, setTopic] = useState({});
    const {dispatch} = React.useContext(Store);

    useEffect(()=>{

        client.get(`Topic/${topic}`).then((r) => {

                if (r.data.ret) {
                    setTopic(r.data.res)
                }
            }
        ).catch(e => {
            dispatch({
                type: 'message',
                payload: {open: true, variant: 'error', content: '服务器异常或网络异常', duration: 2000}
            });
            console.error(e)
        })


    }, [topic, dispatch]);

  return (
        <Route
          exact
          path={'/topic/:topic/:url'}
          children={({match}) => match && <P Topic={Topic}/>}
        />
    )

}

export default withRouter(Topic);
