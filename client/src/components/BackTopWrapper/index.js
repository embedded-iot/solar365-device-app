import { FormattedMessage } from "react-intl";
import { BackTop } from "antd";
import React from "react";

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14
};

const BackTopWrapper = () => (
  <BackTop>
    <div style={style}><FormattedMessage id="BACK_TOP" /></div>
  </BackTop>
);

export default BackTopWrapper;

