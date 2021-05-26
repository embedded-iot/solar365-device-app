import React from "react";
import parse from 'html-react-parser';
import { Tooltip } from 'antd';
import { FormattedMessage } from "react-intl";
import TableWrapper from "../../components/TableWrapper";
import CheckboxGroup from "../../components/CheckboxGroup";
import StatusTag from "../../components/StatusTag";
import { webSocketClient } from "../../Utils";
import { ACTION_TYPES } from "../../components/constants";
import { LoggerFaultServices } from "../../components/LoggerFault/LoggerFaultServices";

import "./style.scss";

class LoggerFault extends React.PureComponent {

  constructor(props) {
    super(props);

    this.alertTypes = LoggerFaultServices.ALERT_TYPES_OPTIONS;
    this.state = {
      dataSource: [],
      selectedAlertTypes: props.match && props.match.params && props.match.params.type ? [props.match.params.type] : this.alertTypes.map(type => type.value)
    };
  }

  componentDidMount() {
    webSocketClient.receivedMessage((response) => {
      if (response.type === ACTION_TYPES.FAULT) {
        const dataSource = response.data && response.data.list.map(LoggerFaultServices.transformLoggerFaultList);
        this.setState({
          dataSource
        });
      }
    });

    webSocketClient.sendMessage({ type: ACTION_TYPES.FAULT });
  }

  columnsDef = [
    {
      title: <FormattedMessage id="DATE" />,
      dataIndex: 'convertedDate',
      width: '15%',
    },
    {
      title: <FormattedMessage id="CATEGORY" />,
      dataIndex: 'category',
      width: '10%',
    },
    {
      title: <FormattedMessage id="TYPE" />,
      dataIndex: 'type',
      width: '10%',
      render: type => <StatusTag status={type} />
    },
    {
      title: <FormattedMessage id="DEVICE_NAME" />,
      dataIndex: 'dev_name',
      width: '15%',
    },
    {
      title: <FormattedMessage id="FAULT_NAME" />,
      dataIndex: 'description',
      width: '20%',
    },
    {
      title: <FormattedMessage id="REASON" />,
      dataIndex: 'reason',
      render: (reason, row) => !!row.suggest ? (
        <Tooltip title={row.suggest} color='yellow'>
          parse(reason)
        </Tooltip>
      ) : parse(reason)
    }
  ];

  onChangeTypes = (checkedValues) => {
    this.setState({
      selectedAlertTypes: checkedValues
    });
  }

  getFilteredDataSource = activityLogs => activityLogs.filter(activityLog => this.state.selectedAlertTypes.indexOf(activityLog.type) > -1)

  render() {
    const { dataSource = [], selectedAlertTypes } = this.state;
    return (
      <React.Fragment>
        <div className="page-header"><FormattedMessage id="LOGGER_FAULT" /></div>
        <div className="page-contents">
          {/* eslint-disable-next-line no-undef */}
          <CheckboxGroup label={`${i18n.ALERT_TYPES}:`} options={this.alertTypes} defaultValue={selectedAlertTypes} onChange={this.onChangeTypes} />
          <TableWrapper columns={this.columnsDef} dataSource={this.getFilteredDataSource(dataSource)} />
        </div>
      </React.Fragment>
    );
  }
}

export default LoggerFault;
