import React from 'react';
import {Head, Section} from "../../../components/styled/frameworks";
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
    <Head>
      <h3> 用户信息 </h3>
    </Head>
    <Section style={{padding: "100px 20%"}}>

      <Switch>
        <Route path="/about/user/signin" component={() => <Login  />} exact={false}/>

        <Route path="/about/user/current" component={() => <Current  />} exact={false}/>


      </Switch>
    </Section>
  </React.Fragment>;
}

export default UserInfo;
