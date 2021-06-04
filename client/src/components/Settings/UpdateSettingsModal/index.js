import React from "react";
import {Input, InputNumber, Modal, Transfer} from "antd";
import {FormattedMessage} from "react-intl";

import "./style.scss";

class UpdateSettingsModal extends React.PureComponent {
  constructor(props) {
    super(props);

    const { selectedDevice } = props;

    this.state = {
      stationName: (selectedDevice && selectedDevice.stationName) || '',
      stringsCount: (selectedDevice && selectedDevice.stringsCount) || 18,
      originDirection: (selectedDevice && selectedDevice.originDirection) || [],
      firstDirection: (selectedDevice && selectedDevice.firstDirection) || [],
      secondDirection: (selectedDevice && selectedDevice.secondDirection) || [],
      powerPerPin: (selectedDevice && selectedDevice.powerPerPin) || 440
    }

  }

  componentDidMount() {
    this.renderStringDirections();
  }

  renderStringDirections = () => {
    const originDirection = [];
    const firstDirection = [];
    for (let i = 0; i < this.state.stringsCount; i++) {
      originDirection.push({
        key: (i + 1),
        title: `String ${i + 1}`
      });
      firstDirection.push(i+1);
    }
    this.setState({
      originDirection,
      firstDirection
    });
  }

  handleOk = () => {
    const { stationName, stringsCount, firstDirection, secondDirection, powerPerPin } = this.state;
    this.props.onOk({
      stationName,
      stringsCount,
      firstDirection,
      secondDirection,
      powerPerPin
    })
    this.props.onChange(false);
  };

  handleCancel = () => {
    this.props.onChange(false);
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value
    }, () => {
      if (name === 'stringsCount') {
        this.renderStringDirections();
      }
    });
  }

  onChangeTransfer = (nextTargetKeys) => {
    const { originDirection } = this.state;
    console.log(nextTargetKeys);
    this.setState({
      secondDirection: nextTargetKeys,
      firstDirection: originDirection.filter(string => nextTargetKeys.indexOf(string.key) === -1).map(string => string.key)
    });
  };

  render() {
    const { open } = this.props;
    const { stationName, stringsCount, originDirection, secondDirection, powerPerPin } = this.state;
    return (
      <Modal title={<FormattedMessage id="UPDATE_SETTINGS" />}
             visible={open}
             maskClosable={false}
             onOk={this.handleOk}
             okText={<FormattedMessage id="SAVE" />}
             onCancel={this.handleCancel}
             cancelText={<FormattedMessage id="CANCEL" />}
      >
        <div className="margin-bottom-20">
          <span className="text-bold"><FormattedMessage id="STATION_NAME" />: </span>
          <Input placeholder="T1,2,3" value={stationName} onChange={(e) => this.onChange(e.target.value, 'stationName')}/>
        </div>
        <div className="margin-bottom-20">
          <span className="text-bold"><FormattedMessage id="STRINGS_COUNT" />: </span>
          <InputNumber min={1} max={40} value={stringsCount} onChange={(value) => this.onChange(value, 'stringsCount')} />
          (<FormattedMessage id="PIN" />)
        </div>
        <div className="margin-bottom-20">
          <span className="text-bold"><FormattedMessage id="STRING_DIRECTIONS" />: </span>
          <Transfer
            dataSource={originDirection}
            titles={[
              <span><FormattedMessage id="DIRECTION" /> 1</span>,
              <span><FormattedMessage id="DIRECTION" /> 2</span>]}
            targetKeys={secondDirection}
            onChange={this.onChangeTransfer}
            render={item => item.title}
          />
        </div>
        <div className="margin-bottom-20">
          <span className="text-bold"><FormattedMessage id="POWER_PER_PIN" />: </span>
          <InputNumber min={1} value={powerPerPin} onChange={(value) => this.onChange(value, 'powerPerPin')} />
          (kWh)
        </div>
      </Modal>
    )
  }
}

export default UpdateSettingsModal;