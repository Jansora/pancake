import React from 'react';
import connect from "react-redux/es/connect/connect";

import {Link, NavLink, withRouter } from "react-router-dom";


import { Icon, Input, Image, Dropdown} from 'semantic-ui-react';

import {client, format} from "../components/requests";
import  "./assets/header.less"

import {updatePost} from "../redux/actions/post";
import {updateLoading} from "../redux/actions/loading";
import {updateApp} from "../redux/actions/app";


class Login extends React.Component {

  state = {
    loading: false
  };
  
  componentDidMount() {
    this.oauthLogin();
  }
  oauthLogin () {
    const {dispatch} = this.props;
    const state = localStorage.getItem("state");
    this.setState({loading:true});
    client.get(`/Oauth` )
      .then(r => {
        this.setState({loading:false});
        if (r.data.ret) {
          const user = {
            name: r.data.res.name,
            url: r.data.res.html_url,
            avatar: r.data.res.avatar_url,
          };
          dispatch(updateApp({user, loginStatus: true}))
        }
      }
      ).catch(e=> {
        console.log(e);
      }
  
    )
  }
  waitGithubLogin = () => {
    const {dispatch, state} = this.props;
    this.setState({loading:true});
    const timer = setInterval(()=>{
    
       client.get(`/Oauth` )
         .then(r => {
             if (r.data.ret) {
               clearInterval(timer);
               this.setState({loading:false});
               const user = {
                 name: r.data.res.name,
                 url: r.data.res.html_url,
                 avatar: r.data.res.avatar_url,
               };
               localStorage.setItem("state", state);
               dispatch(updateApp({user, loginStatus: true}))
             
             }
             // console.log(r.data.res)
           }
         ).catch( e => {
            dispatch(updateApp({loginStatus: false}))
         }
         
       )
       
    }, 3000)
  }
  
  exit = () => {
    localStorage.removeItem("state");
    const {dispatch} = this.props;
    const user = {
      name: "",
      url: "",
      avatar: "",
    };

    dispatch(updateApp({user, loginStatus: false}))
  }
  render() {

    const { user, loginStatus, loginUrl, } = this.props;
    const {loading} = this.state;
    const trigger = <React.Fragment>
                      <Image src={user.avatar} avatar />
                      <span>{user.name}</span>
                    </React.Fragment>;
                    
    const options = [
      { key: 'user', text: <a target='_blank' href={`${user.url}`} >我的 Github </a>,},
      { key: 'settings', text: <a onClick={() => {}}>设置</a> },
      { key: 'sign-out', text: <a onClick={() => this.exit()}>退出</a>,},
    ];
    return (

          <div style={{display: 'block'}}>
            {
              loginStatus
                ? <React.Fragment>
                    <Dropdown trigger={trigger} options={options} pointing='top right' icon={null} />
                  </React.Fragment>
                : loading
                    ? <Icon loading name='asterisk' />
                    : <React.Fragment>
                        <span className={"description"}>使用</span>
                        {/*<Link to="/"><Icon name='google'/></Link>*/}
                        {/*<span className={"description"}>或</span>*/}
                        <a target='_blank' href={`${loginUrl}`} onClick={this.waitGithubLogin}><Icon name='github'/></a>
                        {/*<span className={"description"}>或</span>*/}
                        {/*<Link to="/"><Icon name='wechat'/></Link>*/}
                        <span className={"description"}>登入本站点</span>
                      </React.Fragment>
            }
            
    
          </div>


    )
  }
}

const mapStateToProps = state => ({
  user: state.app.user,
  state: state.app.state,
  loginStatus: state.app.loginStatus,
  loginUrl: state.app.loginUrl,
});
export default withRouter(connect(
  mapStateToProps,
)(Login));



