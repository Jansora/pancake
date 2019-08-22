import React, {Component} from 'react';

import './App.less';
import './assets/semantic/semantic.css';
import {withRouter} from "react-router-dom";
import Header from './layouts/header';
import Content from './layouts/content'
import Footer from './layouts/footer'
import Background from './layouts/background';
import AppLoading from './components/loader/app';
import Loading from './components/loader/common';
import {setTitle} from "./components/title";
import connect from "react-redux/es/connect/connect";


class App extends Component {
  
  componentWillMount() {
    setTitle("主页");
    let color = localStorage.getItem('theme');
    if(color === undefined) {
        color = 'green';
        localStorage.setItem('theme', color);
    }
    document.body.classList.add(color)
  }
  
  componentDidMount() {
  }
  
  render() {
    return (
      <React.Fragment>
        <Header/>
        <Content/>
        <Footer/>
        <Background/>
        <Loading/>
        <AppLoading/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app
});
export default withRouter(connect(
  mapStateToProps,
)(App));

