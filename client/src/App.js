import React from 'react';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { Redirect, Route, withRouter } from "react-router";

import Header from "./components/Header/Header";
import Dashboard from "./containers/Dashboard";
import LoginPage from "./containers/LoginPage";
import { globalConfig } from "./Utils";
import LeftNavigation from "./components/Dashboard/LeftNavigation";

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.scss';

const PrivateRouter = (props) => {
  const CONFIG_BACKEND = globalConfig.getConfigBackend();
  return (
    <Route>
      {
        CONFIG_BACKEND.isLogined ? (
          <div className="app">
            <div className="app__sidebar">
              <LeftNavigation />
            </div>
            <div className="app__content">
              { props.children }
            </div>
          </div>
        ) : <LoginPage />
      }
    </Route>
  );
};

const Routers = withRouter((props) => (
  <Switch>
    <PrivateRouter path="/home">
      <Dashboard />
    </PrivateRouter>
    <PrivateRouter path="/statistics">
      Statistic
    </PrivateRouter>
    <PrivateRouter path="/devices">
      Device
    </PrivateRouter>
    <PrivateRouter path="/logger-fault">
      Logger Fault
    </PrivateRouter>
    <PrivateRouter path="/solar-fault">
      Solar Fault
    </PrivateRouter>
    {
      props.location && props.location.pathname === '/' && <Redirect to={{ pathname: '/home'}} />
    }
  </Switch>
));

const App = () => (
  <React.Fragment>
    <Router>
      <Header />
      <Routers />
    </Router>
  </React.Fragment>
);

export default App;
