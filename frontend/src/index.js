import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from 'react-router-dom';

import StoreProvider from "./store/global";

import GlobalColors from "./styled/GlobalColors";
import GlobalStyle from "./styled/GlobalStyles";

// import 'antd/dist/antd.min.css'
// import 'semantic-ui-css/semantic.min.css'


ReactDOM.render(
    <StoreProvider>
        <GlobalStyle/><GlobalColors/>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StoreProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
// serviceWorker.unregister();
