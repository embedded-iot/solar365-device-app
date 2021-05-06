import React from "react";
import { FormattedMessage } from "react-intl";
import TableWrapper from "../../components/TableWrapper";
import CheckboxGroup from "../../components/CheckboxGroup";
import { webSocketClient } from "../../Utils";
import { ACTION_TYPES } from "../../components/constants";
import { Solar365FaultServices } from "../../components/Solar365Fault/Solar365FaultServices";

import "./style.scss";

class Solar365Fault extends React.PureComponent {

  constructor(props) {
    super(props);

    this.alertTypes = Solar365FaultServices.ALERT_TYPES_OPTIONS;
    this.state = {
      dataSource: [],
      selectedAlertTypes: props.match && props.match.params && props.match.params.type ? [props.match.params.type] : this.alertTypes.map(type => type.value)
    };
  }

  componentDidMount() {
    webSocketClient.receivedMessage((response) => {
      if (response.type === ACTION_TYPES.ACTIVITY_LOG) {
        this.setState({
          dataSource: response.data && response.data.list.map(Solar365FaultServices.transformSolar365FaultList)
        });
      }
    });

    webSocketClient.sendMessage({ type: ACTION_TYPES.ACTIVITY_LOG });
  }

  columnsDef = [
    {
      title: <FormattedMessage id="DATE" />,
      dataIndex: 'convertedDate',
      width: '25%',
    },
    {
      title: <FormattedMessage id="TYPE" />,
      dataIndex: 'convertedType',
      width: '25%',
    },
    {
      title: <FormattedMessage id="CATEGORY" />,
      dataIndex: 'convertedCategory',
      width: '25%',
    },
    {
      title: <FormattedMessage id="DESCRIPTION" />,
      dataIndex: 'description',
    },
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
        <div className="page-header"><FormattedMessage id="SOLAR_FAULT" /></div>
        <div className="page-contents">
          {/* eslint-disable-next-line no-undef */}
          <CheckboxGroup label={`${i18n.ALERT_TYPES}:`} options={this.alertTypes} defaultValue={selectedAlertTypes} onChange={this.onChangeTypes} />
          <TableWrapper columns={this.columnsDef} dataSource={this.getFilteredDataSource(dataSource)} />
        </div>
      </React.Fragment>
    );
  }
}

export default Solar365Fault;
