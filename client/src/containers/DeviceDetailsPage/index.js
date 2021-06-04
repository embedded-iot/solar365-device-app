import React from "react";
import { Tabs } from "antd";
import { FormattedMessage } from "react-intl";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { webSocketClient } from "../../Utils";
import { ACTION_TYPES } from "../../components/constants";
import DeviceLog from "../../components/Devices/DeviceLog";

const { TabPane } = Tabs;

class DeviceDetailsPage extends React.PureComponent {
  constructor(props) {
    super(props);

    const { deviceName, deviceId, tab } = (props.match && props.match.params) || {};
    this.title = deviceName || <FormattedMessage id="DEVICE_DETAILS" />;
    this.deviceId = Number(deviceId);
    this.tab = tab || 0;
    this.state = {
      RealtimeValuesResponse: {},
      DCDataResponse: {}
    };
  }

  componentDidMount() {
    webSocketClient.receivedMessage((response) => {
      if (response.type === ACTION_TYPES.DEVICE_INFO) {
        const { list = [], listIO = [] } = response.data;
        const RealtimeValuesResponse = (list.find(deviceLog => deviceLog.deviceId === this.deviceId)) || {};
        const DCDataResponse = (listIO.find(data => data.deviceId === this.deviceId)) || {};
        this.setState({
          RealtimeValuesResponse,
          DCDataResponse
        });
      }
    });

    webSocketClient.sendMessage({ type: ACTION_TYPES.DEVICE_INFO }, true);
  }

  backPage = () => {
    console.log(this.props);
    this.props.history.goBack();
  }

  realtimeColumnsDef = [
    {
      title: <FormattedMessage id="PARAMETER_NAME" />,
      dataIndex: 'data_name',
      width: '50%'
    }, {
      title: <FormattedMessage id="CURRENT_VALUE_UNIT" />,
      dataIndex: 'data_value',
      width: '50%',
      // eslint-disable-next-line camelcase
      render: (data_value, deviceLog) => (`${data_value} ${deviceLog.data_unit}`)
    }
  ];


  DCDataColumnsDef = [
    {
      title: <FormattedMessage id="NAME" />,
      dataIndex: 'name',
      width: '40%'
    }, {
      title: <FormattedMessage id="VOLTAGE_V" />,
      dataIndex: 'voltage',
      width: '35%',
    }, {
      title: <FormattedMessage id="CURRENT_A" />,
      dataIndex: 'current',
      width: '35%'
    }
  ];

  render() {
    const { RealtimeValuesResponse, DCDataResponse } = this.state;
    console.log(DCDataResponse);
    return (
      <React.Fragment>
        <div className="page-header">
          <span className="link" onClick={this.backPage}><ArrowLeftOutlined /></span>
          {this.title}
        </div>
        <div className="page-contents">
          <Tabs defaultActiveKey={this.tab}>
            <TabPane tab={<FormattedMessage id="REALTIME_VALUES" />} key="0">
              <DeviceLog columns={this.realtimeColumnsDef || []} dataSource={RealtimeValuesResponse.list || []} />
            </TabPane>
            <TabPane tab={<FormattedMessage id="DC_DATA" />} key="1">
              <DeviceLog columns={this.DCDataColumnsDef || []} dataSource={DCDataResponse.list || []} />
            </TabPane>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default DeviceDetailsPage;
