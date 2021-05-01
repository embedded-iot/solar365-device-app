import React from 'react';
import { Badge } from "antd";
import moment from 'moment';

import './style.scss';
import { FormattedMessage } from "react-intl";


const MasterStatus = (props) => (
  <div className="master-status__wrapper">
    <div className="master-status__item">
      <span className="master-status__title"><FormattedMessage id="STATUS" />:</span>
      <span className="master-status__value">
        {
          props.isConnected ? <Badge color="#2db7f5" text={<FormattedMessage id="CONNECTED" />} /> : <Badge color="#f50" text={<FormattedMessage id="NO_CONNECT" />} />
        }
      </span>
    </div>
    <div className="master-status__item">
      <span className="master-status__title"><FormattedMessage id="TOTAL_DEVICES" />:</span>
      <span className="master-status__value">{props.deviceCount || '-'}</span>
    </div>
    <div className="master-status__item">
      <span className="master-status__title">IP:</span>
      <span className="master-status__value">{props.ip || '-'}</span>
    </div>
    <div className="master-status__item">
      <span className="master-status__title"><FormattedMessage id="REQUEST_DATA_INTERVAL" />:</span>
      <span className="master-status__value">{`${props.clientConnectInterval || '-'} (s)`}</span>
    </div>
    <div className="master-status__item">
      <span className="master-status__title"><FormattedMessage id="LAST_UPDATED_DATA_TIME" />:</span>
      <span className="master-status__value">{props.updateAt ? moment(props.updateAt).format('DD MM YYYY - HH:mm') : '-'}</span>
    </div>
  </div>
);

export default MasterStatus;
