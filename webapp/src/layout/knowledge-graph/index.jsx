/*
* @file index.jsx
* @author jansora
* @date 2020/2/16
*/


import React from "react";
import {Head} from "../../components/styled/frameworks";
import {Route, Switch} from "react-router-dom";
import {useTitle} from 'ahooks'
import Books from "./books";


const KnowledgeGraph = (props) => {

    useTitle("知识图谱")
    return (
        <React.Fragment>
              <Head >
                  <h3>知识图谱</h3>
              </Head>


          <Switch>
            <Route path="/KnowledgeGraph" component={Books} exact={true}/>
          </Switch>


        </React.Fragment>
    )
}

export default KnowledgeGraph;
