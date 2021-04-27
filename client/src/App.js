import React from 'react';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import './App.css';

import { Container } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./components/Header/Header";
import Dashboard from "./containers/Dashboard";
import LoginPage from "./containers/LoginPage";
import {globalConfig} from "./containers/Utils";

const PrivateRouter = (props) => {
  const CONFIG_BACKEND = globalConfig.getConfigBackend();
  return (
    !!CONFIG_BACKEND.isLogined ? props.children : <LoginPage />
  )
}

const App = () => {
  return (
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
}

export default App;
