import React from 'react';
import { Badge } from "antd";
import moment from 'moment';

import './style.scss';
import { FormattedMessage } from "react-intl";
import { DateServices } from "../../../Utils";

const openLoggerPortal = (url) => {
  window.open(url, '_blank');
}

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
      <span className="master-status__title">IP:</span>
      <span className="master-status__value">{(props.MASTER_API && <span className="link" onClick={() => openLoggerPortal(props.MASTER_API)}>{props.MASTER_API}</span>) || '-'}</span>
    </div>
    <div className="master-status__item">
      <span className="master-status__title"><FormattedMessage id="REQUEST_DATA_INTERVAL" />:</span>
      <span className="master-status__value">{`${props.clientConnectInterval || '-'} (s)`}</span>
    </div>
    <div className="master-status__item">
      <span className="master-status__title"><FormattedMessage id="LAST_UPDATED_DATA_TIME" />:</span>
      {/* eslint-disable-next-line no-undef */}
      <span className="master-status__value">{props.updateAt ? DateServices.convert(props.updateAt, i18n.DATE_FORMAT) : '-'}</span>
    </div>
    <div className="master-status__item">
      <span className="master-status__title"><FormattedMessage id="TOTAL_DEVICES" />:</span>
      <span className="master-status__value">{props.devicesCount || '-'}</span>
    </div>
  </div>
);

export default MasterStatus;
