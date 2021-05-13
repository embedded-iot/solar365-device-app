import React from 'react';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Redirect, withRouter } from "react-router";

import { globalConfig, Events } from "./Utils";

import LeftNavigation from "./components/Dashboard/LeftNavigation";
import Header from "./components/Header/Header";
import BackTopWrapper from "./components/BackTopWrapper";

import Dashboard from "./containers/Dashboard";
import LoginPage from "./containers/LoginPage";
import Solar365Fault from "./containers/Solar365Fault";
import LoggerFault from "./containers/LoggerFault";
import DevicesPage from "./containers/DevicesPage";
import DeviceDetailsPage from "./containers/DeviceDetailsPage";
import StatisticsPage from "./containers/StatisticsPage";
import OverviewPage from "./containers/OverviewPage";


import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.scss';

const RefreshRouter = (props) => {
  const CONFIG_BACKEND = globalConfig.getConfigBackend();
  if (props.private && !CONFIG_BACKEND.isLogined) {
    return <LoginPage />;
  }
  return (
    <div className="app">
      <div className="app__sidebar">
        <LeftNavigation />
      </div>
      <div className="app__content">
        <Route path={props.path} component={props.component} />
      </div>
    </div>
  );
};

const Routers = withRouter((props) => (
  <Switch>
    <RefreshRouter path="/overview" component={OverviewPage} private={false} />
    <RefreshRouter path="/home" component={Dashboard} private />
    <RefreshRouter path="/statistics" component={StatisticsPage} />
    <RefreshRouter path="/devices/details/:deviceId/:tab/:deviceName" component={DeviceDetailsPage} private />
    <RefreshRouter path="/devices/filter/:type" component={DevicesPage} private />
    <RefreshRouter path="/devices" component={DevicesPage} private />
    <RefreshRouter path="/logger-fault/filter/:type" component={LoggerFault} private />
    <RefreshRouter path="/logger-fault" component={LoggerFault} private />
    <RefreshRouter path="/solar-fault/filter/:type" component={Solar365Fault} private />
    <RefreshRouter path="/solar-fault" component={Solar365Fault} private />
    {
      props.location && props.location.pathname === '/' && <Redirect to={{ pathname: '/overview'}} />
    }
  </Switch>
));

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false
    };
  }

  componentDidMount() {
    Events.subscribe("WEBSOCKET_CONNECTED", this.websocketConnected);
  }

  websocketConnected = () => {
    this.setState({
      isConnected: true
    });
  }

  componentWillUnmount() {
    Events.unsubscribe("WEBSOCKET_CONNECTED", this.websocketConnected);
  }

  render() {
    const { isConnected } = this.state;
    if (!isConnected) {
      return null;
    }
    return (
      <React.Fragment>
        <Router>
          <Header />
          <Routers />
          <BackTopWrapper />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
