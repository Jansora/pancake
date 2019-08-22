import React from 'react';
import connect from "react-redux/es/connect/connect";

import {Link, NavLink, withRouter} from "react-router-dom";

import {Icon, Image, List} from 'semantic-ui-react';
import {message} from "antd";
import Login from './login';

import "./assets/header.less"
import {updateProgress} from "../redux/actions/progress";

const githubBaseUrl = 'https://github.com/login/oauth/authorize?client_id=00ca09e946ecd96736c9'
const githubOptions = {
  client_id:'00ca09e946ecd96736c9',
  scope: 'user:email',
  state: new Date().getUTCSeconds(),
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
    window.addEventListener('scroll', this.scroll);
  }
  scroll = () => {
    const {dispatch} = this.props;
    let progressBar = (window.scrollY + 1) / (document.body.scrollHeight - document.body.clientHeight + 1) * 100;
    dispatch(updateProgress({progressBar}))
    //this.setState({progressBar:progressBar})
  }
  
  themes = [
    {color:'red', description:'Red'},
    {color:'orange', description:'orange'},
    {color:'yellow', description:'Yellow'},
    {color:'olive', description:'Olive'},
    {color:'green', description:'Green'},
    {color:'blue', description:'Blue'},
    {color:'violet', description:'Violet'},
    {color:'purple', description:'Purple'},
    {color:'pink', description:'Pink'},
    {color:'brown', description:'Brown'},
    {color:'grey', description:'Grey'},
  ]
  
  setTheme = (theme) => {
    document.body.classList = [];
    document.body.classList.add(theme.color);
    message.success(`主题色 ${theme.description} 编译成功`);
    localStorage.setItem('theme', theme.color)
  }
  
  render() {
    const {progress} = this.props;
    return (
      <header>
        <div>
          <div>
            {/*<Link to="/" style={{"minWidth":"120px"}}>Jans' Personal Site</Link>*/}
            <Link to='/' style={{top: '0', position: 'fixed'}}>
              <Image style={{top: '3px', position: 'fixed'}} size='small'
                     src={'https://cdn.jansora.com/logo/main.png'} verticalAlign='middle'/>
            </Link>
          </div>
          <div>
            <NavLink to="/p"  activeClassName={'active-color'}><Icon name='book' /> 资料集 </NavLink>
            <NavLink to="/topic" activeClassName={'active-color'}><Icon name='cogs'/> 话题 </NavLink>
            <NavLink to="/project" activeClassName={'active-color'}><Icon name='paper plane outline'/> 项目 </NavLink>
          </div>
          <div>
            <Login/>
          </div>
        </div>
        <div className='theme'>
          <div className='theme-wrapper'>
            <List horizontal>
              {
                this.themes.map(theme =>
                  <List.Item onClick={()=>this.setTheme(theme)} key={theme.color}>
                    <Icon name='circle' color={theme.color} size='large'/>
                    {/*<span>{theme.description}</span>*/}
                  </List.Item>
                )
              }
            </List>
            
          </div>
        </div>
        <div className={"progress"} style={{"width": `${progress.progressBar}%`}}>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  progress: state.progress
});
export default withRouter(connect(
  mapStateToProps,
)(Header));



