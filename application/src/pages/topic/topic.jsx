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

                    // 后端 PG 查 专栏目录时没有堆目录排序，此处先拍下序
                    const result = r.data.res;
                    const indexes = result.Articles.map(index => parseInt(index.split(':')[1].split(',')[0]));

                    const sortable = result.ArticleObjects;
                    sortable.sort(function(a, b) {
                        return indexes.indexOf(a.Id) - indexes.indexOf(b.Id);
                    });
                    setTopic(result)
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
