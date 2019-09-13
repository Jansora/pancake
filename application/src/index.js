import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';


import * as serviceWorker from './serviceWorker';

import {GlobalColors, GlobalStyle} from "./styles/GlobalStyles";

import App from './App';

import Store from './utils/store'


ReactDOM.render(
  <Store>
    <GlobalStyle/><GlobalColors/>
    <Router>
      <App/>
    </Router>
  </Store>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
