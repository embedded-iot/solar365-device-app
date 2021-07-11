import React from "react";
import {Input, InputNumber, Modal} from "antd";
import {FormattedMessage} from "react-intl";
import CheckboxGroup from "../../CheckboxGroup";

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
      powerPerPin: (selectedDevice && selectedDevice.powerPerPin) || 440,
      pinsPerString: (selectedDevice && selectedDevice.pinsPerString) || 0,
    }
    this.checkboxList = this.getCheckboxList();
  }

  getCheckboxList = (disabledItems = []) => {
    const { stringsCount } = this.state;
    const checkboxList = [];
    for (let index = 1; index <= stringsCount; index++) {
      checkboxList.push({ value: index, label: `String ${index}`, disabled: disabledItems.includes(index) })
    }
    return checkboxList;
  }

  handleOk = () => {
    const { stationName, stringsCount, firstDirection, secondDirection, powerPerPin, pinsPerString } = this.state;
    this.props.onOk({
      stationName,
      stringsCount,
      firstDirection,
      secondDirection,
      powerPerPin,
      pinsPerString
    })
    this.props.onChange(false);
  };

  handleCancel = () => {
    this.props.onChange(false);
  }
  onChange = (value, name) => {
    this.setState({
      [name]: value
    });
  }

  onChangeCheckbox = (checkedValues, name) => {
    const { firstDirection, secondDirection } = this.state;
    this.setState({
      firstDirection: name === 'firstDirection' ? checkedValues : firstDirection.filter(item => !checkedValues.includes(item)),
      secondDirection: name === 'secondDirection' ? checkedValues : secondDirection.filter(item => !checkedValues.includes(item))
    });
  }

  render() {
    const { open } = this.props;
    const { stationName, firstDirection, secondDirection, powerPerPin, pinsPerString } = this.state;
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
          <span className="text-bold"><FormattedMessage id="DIRECTION" /> 1: </span>
          <CheckboxGroup name="firstDirection" options={this.checkboxList} value={firstDirection} onChange={this.onChangeCheckbox}/>
        </div>
        <div className="margin-bottom-20">
          <span className="text-bold"><FormattedMessage id="DIRECTION" /> 1: </span>
          <CheckboxGroup name="secondDirection" options={this.checkboxList} value={secondDirection} onChange={this.onChangeCheckbox}/>
        </div>
        <div className="margin-bottom-20">
          <span className="text-bold"><FormattedMessage id="PINS_PER_STRING" />: </span>
          <InputNumber min={0} max={40} value={pinsPerString} onChange={(value) => this.onChange(value, 'pinsPerString')} />
          (<FormattedMessage id="PIN" />)
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