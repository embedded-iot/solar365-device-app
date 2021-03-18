import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import './App.css';

import Header from "./components/Header/Header";
import Dashboard from "./containers/Dashboard";
import { Container, Row, Col } from 'reactstrap';

const client = new W3CWebSocket('ws://127.0.0.1:8000');
const contentDefaultMessage = "Start writing your document here";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <React.Fragment>
        <Header />
        <Container>
          <Row md="4">
            <Col md="8">

              <Dashboard />
            </Col>
            <Col>Column</Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
