import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import * as serviceWorker from './serviceWorker';

import {GlobalColors, GlobalStyle} from "./styles/GlobalStyles";

import App from './App';

import reducer from './utils/reducer';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION_ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle/><GlobalColors/>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
