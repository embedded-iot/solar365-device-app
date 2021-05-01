import React from 'react';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';


import { Container } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Header from "./components/Header/Header";
import Dashboard from "./containers/Dashboard";
import LoginPage from "./containers/LoginPage";
import { globalConfig } from "./containers/Utils";

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.scss';

const PrivateRouter = (props) => {
  const CONFIG_BACKEND = globalConfig.getConfigBackend();
  return (
    CONFIG_BACKEND.isLogined ? props.children : <LoginPage />
  );
};

const App = () => (
  <React.Fragment>
    <Header />
    <Container>
      <Router>
        <Switch>
          <PrivateRouter path="*">
            <Dashboard />
          </PrivateRouter>
        </Switch>
      </Router>
    </Container>
  </React.Fragment>
);

export default App;
