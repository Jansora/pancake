import React from 'react';
import {SubHead, Section} from "../../../components/styled/frameworks";
import {Route, Switch} from "react-router-dom";
import Login from "./Login";
import Current from "./Current";

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/06 11:54:03
 */
const UserInfo = (props) => {

  return <React.Fragment>
    <SubHead>
      <h3> 用户信息 </h3>
    </SubHead>
    <Section style={{padding: "100px 20%"}}>

      <Switch>
        <Route path="/about/user/signin" component={() => <Login  />} exact={false}/>

        <Route path="/about/user/current" component={() => <Current  />} exact={false}/>


      </Switch>
    </Section>
  </React.Fragment>;
}

export default UserInfo;
