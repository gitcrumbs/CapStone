import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Controller from "./screens/Controller";
import {LoadingView} from "./component/LoadingView";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './config/store';
import {BrowserRouter as Router} from "react-router-dom";


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<LoadingView/>} persistor={persistor}>
            <Router>
                <Controller/>
            </Router>
        </PersistGate>
    </Provider>, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

