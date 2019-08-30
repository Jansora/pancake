import React, {useEffect} from 'react';

import {Route, withRouter, Redirect, Switch} from 'react-router-dom';


import TS from './topics'

import P from '../post/p'
import {client} from "../../utils/requests";


const Topic = (props) => {


    const {url, topic} = props.match.params;
    const [Topic, setTopic] = React.useState({});
    const [breadcrumb, setBreadcrumb] = React.useState({label: props.breadcrumb[props.breadcrumb.length - 1].label + '/' + topic + '/' + url, value: '获取中'});



    useEffect(()=>{

        client.get(`Topic/${topic}`).then((r) => {

                if (r.data.ret) {
                    setBreadcrumb({...breadcrumb, value:r.data.res.Name})

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
