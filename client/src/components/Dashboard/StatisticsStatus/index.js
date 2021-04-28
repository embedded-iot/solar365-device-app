import React from 'react';
import { Badge } from "antd";
import moment from 'moment';

import './style.scss';


const StatisticsStatus = (props) => (
  <div className="master-status__wrapper">
    <div className="master-status__item">
      <span className="master-status__title">Số thiết bị:</span>
      <span className="master-status__value">{props.deviceCount || '-'}</span>
    </div>
  </div>
);

export default StatisticsStatus;
