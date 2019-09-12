import React, {useEffect, useState} from 'react';

import {Route, withRouter} from 'react-router-dom';

import P from '../post/p'
import {client} from "../../utils/requests";


const Topic = (props) => {


    const {url, topic} = props.match.params;
    const [Topic, setTopic] = useState({});
    const [breadcrumb, setBreadcrumb] = useState({label: props.breadcrumb[props.breadcrumb.length - 1].label + '/' + topic + '/' + url, value: '获取中'});



    useEffect(()=>{

        client.get(`Topic/${topic}`).then((r) => {

                if (r.data.ret) {
                    setBreadcrumb(breadcrumb => {return {...breadcrumb, value:r.data.res.Name}})

                    setTopic(r.data.res)
                }
            }
        ).catch(e => {
        })


    }, [topic]);

  return (
        <React.Fragment>

            <Route
              exact
              path={'/topic/:topic/:url'}
              children={({match}) => match && <P breadcrumb={props.breadcrumb.concat([breadcrumb])} Topic={Topic}/>}
            />
        </React.Fragment>
    )

}

export default withRouter(Topic);
