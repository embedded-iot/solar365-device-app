import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { WebSocketClient } from "../Utils";
import { ACTION_TYPES } from "../../components/constants";

import MasterStatus from "../../components/Dashboard/MasterStatus";
import StatisticsStatus from "../../components/Dashboard/StatisticsStatus";

import powerGeneration from "../../images/power-generation.svg";
import power from "../../images/power.svg";
import deviceStatus from "../../images/device-status.svg";
import reactive from "../../images/reactive.svg";

import './style.scss';

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

  viewDetailsPage = (router) => {

  }

  render() {
    const statisticsStatus = [{
      title: <FormattedMessage id="YIELD" />,
      icon: powerGeneration,
      viewDetail: () => this.viewDetailsPage('statistics'),
      contents: [
        {
          description: <FormattedMessage id="DAILY_YIELD" />,
          value: 12345,
          unit: 'kwh'
        },
        {
          description: <FormattedMessage id="TOTAL_YIELD" />,
          value: 12345,
          unit: 'kwh'
        }
      ]
    }, {
      title: <FormattedMessage id="POWER" />,
      icon: power,
      viewDetail: () => this.viewDetailsPage('statistics'),
      contents: [
        {
          description: <FormattedMessage id="REAL_TIME_ACTIVE_POWER" />,
          value: 12345,
          unit: 'kW'
        },
        {
          description: <FormattedMessage id="ADJUSTABLE_ACTIVE_POWER" />,
          value: 12345,
          unit: 'kW'
        }
      ]
    }, {
      title: <FormattedMessage id="DEVICE_STATUS" />,
      icon: deviceStatus,
      viewDetail: () => this.viewDetailsPage('devices'),
      contents: [
        {
          description: <FormattedMessage id="OFFLINE_DEVICE" />,
          value: 1,
          unit: <FormattedMessage id="PIECE" />,
          important: true
        },
        {
          description: <FormattedMessage id="ONLINE_DEVICE" />,
          value: 25,
          unit: <FormattedMessage id="PIECE" />
        }
      ]
    }, {
      title: <FormattedMessage id="FAULT" />,
      icon: reactive,
      contents: [
        {
          description: <FormattedMessage id="LOGGER_FAULT" />,
          value: 1,
          unit: <FormattedMessage id="ERROR" />,
          viewDetail: () => this.viewDetailsPage('logger-fault')
        },
        {
          description: <FormattedMessage id="SOLAR_FAULT" />,
          value: 25,
          unit: <FormattedMessage id="ERROR" />,
          viewDetail: () => this.viewDetailsPage('solar-fault')
        }
      ]
    }
    ];
    return (
      <React.Fragment>
        <div className="page-header">Logger1000 (B2005121413)</div>
        <div className="page-contents">
          <MasterStatus />
          <StatisticsStatus list={statisticsStatus} />
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
