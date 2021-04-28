import React, { Component } from 'react';
import { WebSocketClient } from "../Utils";
import { ACTION_TYPES } from "../../components/constants";

import './style.scss';
import MasterStatus from "../../components/Dashboard/MasterStatus";
import StatisticsStatus from "../../components/Dashboard/StatisticsStatus";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUsers: [],
      userActivity: [],
      username: null,
      text: ''
    };
  }

  componentDidMount() {
    WebSocketClient.receivedMessage((response) => {
      console.log(response);
      if (response.type === ACTION_TYPES.REQUEST_LOGIN) {
        console.log('REQUEST_LOGIN');
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-header">Logger1000 (B2005121413)</div>
        <div className="page-contents">
          <MasterStatus />
          <StatisticsStatus />
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
