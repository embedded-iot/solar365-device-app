import { FormattedMessage } from "react-intl";
import React from "react";

const ACTION_TYPES = {
  REFRESH: "Refresh",
  OVERVIEW: "Overview",
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange",
  CONFIG: "config",
  REQUEST_LOGIN: 'userevent',
  CONNECT: 'connect',
  DEVICE_LIST: 'devicelist',
  DEVICE_INFO: 'deviceInfo',
  DEVICE_LOG: 'real',
  DEVICE_LOG_IO: 'direct',
  STATISTICS: 'statistics',
  STATISTICS_RUNTIME: 'runtime',
  FAULT: 'fault',
  ACTIVITY_LOG: 'activityLog',
  ABOUT: 'about',
};

const ALERT_TYPES = {
  SUCCESS: 'Success',
  ERROR: 'Error',
  WARNING: 'Warning'
};

const ALERT_TYPE_COLORS = {
  [ALERT_TYPES.SUCCESS]: 'success',
  [ALERT_TYPES.ERROR]: 'error',
  [ALERT_TYPES.WARNING]: 'warning'
};

const I18N_ALERT_TYPES = {
  [ALERT_TYPES.SUCCESS]: <FormattedMessage id="SUCCESS" />,
  [ALERT_TYPES.ERROR]: <FormattedMessage id="ERROR" />,
  [ALERT_TYPES.WARNING]: <FormattedMessage id="WARNING" />
};

const DEVICE_STATUS_TYPES = {
  ONLINE: 'Online',
  OFFLINE: 'Offline'
};

const I18N_DEVICE_STATUS_TYPES = {
  [DEVICE_STATUS_TYPES.ONLINE]: <FormattedMessage id="ONLINE" />,
  [DEVICE_STATUS_TYPES.OFFLINE]: <FormattedMessage id="OFFLINE" />
};

const DEVICE_STATUS_COLORS = {
  [DEVICE_STATUS_TYPES.ONLINE]: '#2db7f5',
  [DEVICE_STATUS_TYPES.OFFLINE]: '#f50'
};

const STATISTIC_STATUS_TYPES = {
  OFFLINE: 'Offline',
  STANDBY: 'Standby',
  RUN: 'Run',
  SHUTDOWN: 'Shutdown',
};

const I18N_STATISTIC_STATUS_TYPES = {
  [STATISTIC_STATUS_TYPES.OFFLINE]: <FormattedMessage id="OFFLINE" />,
  [STATISTIC_STATUS_TYPES.STANDBY]: <FormattedMessage id="STANDBY" />,
  [STATISTIC_STATUS_TYPES.RUN]: <FormattedMessage id="RUN" />,
  [STATISTIC_STATUS_TYPES.SHUTDOWN]: <FormattedMessage id="SHUTDOWN" />
};

const STATISTIC_STATUS_COLORS = {
  [STATISTIC_STATUS_TYPES.OFFLINE]: '#f50',
  [STATISTIC_STATUS_TYPES.STANDBY]: '#91d5ff',
  [STATISTIC_STATUS_TYPES.RUN]: '#52c41a',
  [STATISTIC_STATUS_TYPES.SHUTDOWN]: '#f50'
};


export {
  ACTION_TYPES,
  ALERT_TYPES,
  ALERT_TYPE_COLORS,
  I18N_ALERT_TYPES,
  DEVICE_STATUS_TYPES,
  I18N_DEVICE_STATUS_TYPES,
  DEVICE_STATUS_COLORS,
  STATISTIC_STATUS_TYPES,
  I18N_STATISTIC_STATUS_TYPES,
  STATISTIC_STATUS_COLORS,
};
