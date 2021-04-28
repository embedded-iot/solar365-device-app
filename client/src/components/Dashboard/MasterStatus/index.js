import React from 'react';
import { Badge } from "antd";
import moment from 'moment';

import './style.scss';


const MasterStatus = (props) => (
  <div className="master-status__wrapper">
    <div className="master-status__item">
      <span className="master-status__title">Trạng thái:</span>
      <span className="master-status__value">
        {
          props.isConnected ? <Badge color="#2db7f5" text="Kết nối" /> : <Badge color="#f50" text="Không kết nối" />
        }
      </span>
    </div>
    <div className="master-status__item">
      <span className="master-status__title">Số thiết bị:</span>
      <span className="master-status__value">{props.deviceCount || '-'}</span>
    </div>
    <div className="master-status__item">
      <span className="master-status__title">IP:</span>
      <span className="master-status__value">{props.ip || '-'}</span>
    </div>
    <div className="master-status__item">
      <span className="master-status__title">Chu kỳ đọc dữ liệu từ Logger:</span>
      <span className="master-status__value">{`${props.clientConnectInterval || '-'} (s)`}</span>
    </div>
    <div className="master-status__item">
      <span className="master-status__title">Thời gian cập nhập gần nhất:</span>
      <span className="master-status__value">{props.updateAt ? moment(props.updateAt).format('DD MM YYYY - HH:mm') : '-'}</span>
    </div>
  </div>
);

export default MasterStatus;
