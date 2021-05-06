import React from "react";
import { Checkbox } from "antd";

import "./style.scss";


const CheckboxGroup = (props) => {
  const { label = '', name = '', options = [], defaultValue = [], onChange = () => {} } = props;
  return (
    <div className="checkbox-group__wrapper">
      {
        label && <span className="checkbox-group__label">{label}</span>
      }
      <Checkbox.Group options={options} defaultValue={defaultValue} onChange={(checkedValues) => onChange(checkedValues, name)} />
    </div>
  )
};

export default CheckboxGroup;
