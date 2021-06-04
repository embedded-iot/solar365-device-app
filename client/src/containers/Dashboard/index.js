import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import { webSocketClient } from "../../Utils";
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
      overviewData: {}
    };
  }

  componentDidMount() {
    webSocketClient.receivedMessage((response) => {
      console.log(response);
      if (response.type === ACTION_TYPES.OVERVIEW) {
        this.setState({
          overviewData: response.data
        });
      }
    });

    webSocketClient.sendMessage({ type: ACTION_TYPES.OVERVIEW }, true);
  }

  viewDetailsPage = (router) => {
    this.props.history.push(router);
  }

  render() {
    const { overviewData } = this.state;
    const statisticsStatus = [{
      title: <FormattedMessage id="YIELD" />,
      icon: powerGeneration,
      viewDetail: () => this.viewDetailsPage('statistics'),
      contents: [
        {
          description: <FormattedMessage id="DAILY_YIELD" />,
          value: overviewData.today_energy,
          unit: overviewData.today_energy_unit,
        },
        {
          description: <FormattedMessage id="TOTAL_YIELD" />,
          value: overviewData.total_energy,
          unit: overviewData.total_energy_unit,
        }
      ]
    }, {
      title: <FormattedMessage id="POWER" />,
      icon: power,
      viewDetail: () => this.viewDetailsPage('statistics'),
      contents: [
        {
          description: <FormattedMessage id="REAL_TIME_ACTIVE_POWER" />,
          value: overviewData.curr_power,
          unit: overviewData.curr_power_unit,
        },
        {
          description: <FormattedMessage id="ADJUSTABLE_ACTIVE_POWER" />,
          value: overviewData.adjust_power_uplimit,
          unit: overviewData.adjust_power_uplimit_unit,
        }
      ]
    }, {
      title: <FormattedMessage id="DEVICE_STATUS" />,
      icon: deviceStatus,
      viewDetail: () => this.viewDetailsPage('devices'),
      contents: [
        {
          description: <FormattedMessage id="OFFLINE_DEVICE" />,
          value: overviewData.offline_num,
          unit: <FormattedMessage id="PIECE" />,
          important: true,
          viewDetail: () => this.viewDetailsPage('devices/filter/Offline')
        },
        {
          description: <FormattedMessage id="ONLINE_DEVICE" />,
          value: overviewData.online_num,
          unit: <FormattedMessage id="PIECE" />,
          viewDetail: () => this.viewDetailsPage('devices/filter/Online')
        }
      ]
    }, {
      title: <FormattedMessage id="FAULT" />,
      icon: reactive,
      contents: [
        {
          description: <FormattedMessage id="LOGGER_FAULT" />,
          value: overviewData.loggerFaultCount,
          unit: <FormattedMessage id="ERROR" />,
          viewDetail: () => this.viewDetailsPage('faults/filter/Error')
        },
        {
          description: <FormattedMessage id="SOLAR_FAULT" />,
          value: overviewData.activityLogCount,
          unit: <FormattedMessage id="ERROR" />,
          viewDetail: () => this.viewDetailsPage('activity-log/filter/Error')
        }
      ]
    }
    ];
    return (
      <React.Fragment>
        <div className="page-header">Logger1000 ({overviewData.DeviceSN || '-'})</div>
        <div className="page-contents">
          <MasterStatus {...overviewData} />
          <StatisticsStatus list={statisticsStatus} />
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
