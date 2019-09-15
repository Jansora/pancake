import React, {useEffect, useState} from 'react';

import {Route, withRouter} from 'react-router-dom';

import P from '../post/p'
import {client} from "../../utils/requests";


const Topic = (props) => {


    const {topic} = props.match.params;
    const [Topic, setTopic] = useState({});


    useEffect(()=>{

        client.get(`Topic/${topic}`).then((r) => {

                if (r.data.ret) {
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
              children={({match}) => match && <P Topic={Topic}/>}
            />
        </React.Fragment>
    )

}

export default withRouter(Topic);
