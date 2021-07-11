import React from "react";
import {Button, Table} from 'antd';
import { FormattedMessage } from "react-intl";
import TableWrapper from "../../components/TableWrapper";
import { webSocketClient } from "../../Utils";
import { ACTION_TYPES } from "../../components/constants";
import UpdateSettingsModal from "../../components/Settings/UpdateSettingsModal";


import "./style.scss";

class SettingsPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      devices: [],
      selectedRowKeys: [],
      isModalShow: false,
      selectedDevice: null
    };
  }

  componentDidMount() {
    webSocketClient.receivedMessage((response) => {
      if (response.type === ACTION_TYPES.SETTINGS) {
        const devices = response.data && response.data.list;
        this.setState({
          devices
        });
      }
    });

    webSocketClient.sendMessage({ type: ACTION_TYPES.SETTINGS });
  }

  columnsDef = [
    {
      title: <FormattedMessage id="STATION_NAME" />,
      dataIndex: 'stationName',
      width: '10%',
    }, {
      title: <FormattedMessage id="DEVICE_NAME" />,
      dataIndex: 'deviceName'
    }, {
      title: <span><FormattedMessage id="STRINGS_COUNT" />(<FormattedMessage id="PIN" />)</span>,
      dataIndex: 'stringsCount',
      width: '10%',
      render: (stringsCount = [], row) => {
        return (row.firstDirection.length + row.secondDirection.length)
      }
    }, {
      title: <span><FormattedMessage id="DIRECTION" /> 1</span>,
      dataIndex: 'firstDirection',
      render: (firstDirection = [], row) => {
        return ((firstDirection.length && (<span><FormattedMessage id="STRING" /> {firstDirection.join(', ')}</span>)) || '-')
      },
      width: '20%'
    }, {
      title: <span><FormattedMessage id="DIRECTION" /> 2</span>,
      dataIndex: 'secondDirection',
      render: (secondDirection = [], row) => {
        return ((secondDirection.length && (<span><FormattedMessage id="STRING" /> {secondDirection.join(', ')}</span>)) || '-')
      },
      width: '20%'
    }, {
      title: <FormattedMessage id="PINS_PER_STRING" />,
      dataIndex: 'pinsPerString',
      width: '10%'
    } , {
      title: <span><FormattedMessage id="POWER_PER_PIN" />(kwh)</span>,
      dataIndex: 'powerPerPin',
      width: '10%'
    }
  ];

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onUpdateSettingsModalChange= (isVisible) => {
    const { devices, selectedRowKeys } = this.state;
    let selectedDevice = null;
    if (isVisible && selectedRowKeys.length === 1) {
      selectedDevice = devices[selectedRowKeys[0]];
    }
    this.setState({
      isModalShow: isVisible,
      selectedDevice
    });
  }

  onUpdateSettingsData = (settings) => {
    const { devices, selectedRowKeys } = this.state;
    const deviceWithSettings = devices.map((device, index) => {
      return selectedRowKeys.indexOf(index.toString()) > -1 ? {
        ...device,
        ...settings
      } : device
    })
    this.setState({
      devices: deviceWithSettings
    }, () => {
      webSocketClient.sendMessage({
        type: ACTION_TYPES.UPDATE_SETTINGS,
        data: {
          list: this.state.devices
        }
      });
    });
  }

  render() {
    const { devices = [], selectedRowKeys = [], isModalShow, selectedDevice } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_NONE
        ]
    };

    return (
      <React.Fragment>
        <div className="page-header">
          <span><FormattedMessage id="SETTINGS" /></span>
          <Button className="margin-left-auto"
                  type="primary"
                  disabled={!selectedRowKeys.length}
                  onClick={() => this.onUpdateSettingsModalChange(true)}>
            <FormattedMessage id="UPDATE_SETTINGS" />
          </Button>
        </div>
        <div className="page-contents">
          {/* eslint-disable-next-line no-undef */}
          <TableWrapper rowSelection={rowSelection}
                        columns={this.columnsDef}
                        dataSource={devices} />
          {
            isModalShow && (
              <UpdateSettingsModal open={isModalShow}
                                   onChange={this.onUpdateSettingsModalChange}
                                   onOk={this.onUpdateSettingsData}
                                   selectedDevice={selectedDevice}
              />
            )
          }
        </div>
      </React.Fragment>
    );
  }
}

export default SettingsPage;
