import React from "react";
import { FormattedMessage } from "react-intl";
import { Badge } from "antd";
import TableWrapper from "../../components/TableWrapper";
import { webSocketClient } from "../../Utils";
import { ACTION_TYPES } from "../../components/constants";
import { StatisticsServices } from "../../components/Statistics/StatisticsServices";

import "./style.scss";

class StatisticsPage extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      statisticsData: [],
      deviceStatisticsData: {}
    };
  }

  componentDidMount() {
    webSocketClient.receivedMessage((response) => {
      if (response.type === ACTION_TYPES.STATISTICS) {
        const statisticsResponse = (response.data && response.data.list) || [];
        if (statisticsResponse.length === 3) {
          const summaryStatisticsData = statisticsResponse[0];
          const deviceStatisticsData = statisticsResponse[2];
          deviceStatisticsData.list = deviceStatisticsData.list.map(StatisticsServices.transformDeviceStatisticList)
          const statisticsData = [
            {
              description: <FormattedMessage id="DAILY_YIELD" />,
              value: summaryStatisticsData.today_energy,
              unit: summaryStatisticsData.today_energy_unit
            },
            {
              description: <FormattedMessage id="TOTAL_YIELD" />,
              value: summaryStatisticsData.total_energy,
              unit: summaryStatisticsData.total_energy_unit
            },
            {
              description: <FormattedMessage id="REAL_TIME_ACTIVE_POWER" />,
              value: summaryStatisticsData.curr_power,
              unit: summaryStatisticsData.curr_power_unit
            },
            {
              description: <FormattedMessage id="ADJUSTABLE_ACTIVE_POWER" />,
              value: summaryStatisticsData.adjust_power_uplimit,
              unit: summaryStatisticsData.adjust_power_uplimit_unit
            }
          ];
          this.setState({
            statisticsData,
            deviceStatisticsData
          });
        }
      }
    });

    webSocketClient.sendMessage({ type: ACTION_TYPES.STATISTICS });
  }

  columnsDef = [
    {
      title: <FormattedMessage id="DEVICE_NAME" />,
      dataIndex: 'dev_name',
      width: '20%',
    },
    {
      title: <FormattedMessage id="DEVICE_STATUS" />,
      dataIndex: 'convertedStatus',
      render: (convertedStatus, device) => <Badge color={device.statusColor} text={convertedStatus} />
    },
    {
      title: <FormattedMessage id="DAILY_YIELD" />,
      dataIndex: 'today_energy',
      width: '20%',
      render: (value) => `${value} kWh`
    },
    {
      title: <FormattedMessage id="ACTIVE_POWER" />,
      dataIndex: 'curr_power',
      width: '20%',
      render: (value) => `${value} kW`
    },
    {
      title: <FormattedMessage id="TOTAL_YIELD" />,
      dataIndex: 'total_energy',
      render: (value) => `${value} kWh`
    }
  ];

  render() {
    const { statisticsData, deviceStatisticsData } = this.state;
    return (
      <React.Fragment>
        <div className="page-header"><FormattedMessage id="STATISTICS" /></div>
        <div className="page-contents">
          <div className="summary-statistics__wrapper">
            {
              !!statisticsData.length && statisticsData.map((statistic, index) => (
                <div className="summary-statistics__item">
                  <div className="summary-statistics__item-header">
                    <span>{statistic.value}</span>
                    <span>{statistic.unit}</span>
                  </div>
                  <div className="summary-statistics__item-description">{statistic.description}</div>
                </div>
              ))
            }
          </div>
          <div className="device-statistics__wrapper">
            <div className="device-statistics__header">
              <span className="device-statistics__title"><FormattedMessage id="INVERTER_REALTIME_VALUES" /></span>
              <span>
              (
                <span className="device-statistics__number important-color">{`${deviceStatisticsData.off_count}`}</span>
                <FormattedMessage id="OFFLINE_DEVICE" />
                <span className="device-statistics__number">{`, ${deviceStatisticsData.connect_count}`}</span>
                <FormattedMessage id="ONLINE_DEVICE" />
              )
              </span>
            </div>
            <TableWrapper columns={this.columnsDef} dataSource={deviceStatisticsData.list} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StatisticsPage;
