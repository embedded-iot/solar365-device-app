import { FormattedMessage } from "react-intl";
import React from "react";

const ACTION_TYPES = {
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
  WARNING: 'Warning',
  PROMPT: 'Prompt',
  SUGGEST: 'Suggest'
};

const ALERT_TYPE_COLORS = {
  [ALERT_TYPES.SUCCESS]: 'success',
  [ALERT_TYPES.ERROR]: 'error',
  [ALERT_TYPES.WARNING]: 'warning',
  [ALERT_TYPES.PROMPT]: 'processing',
  [ALERT_TYPES.SUGGEST]: 'default'
};

const I18N_ALERT_TYPES = {
  [ALERT_TYPES.SUCCESS]: <FormattedMessage id="SUCCESS" />,
  [ALERT_TYPES.ERROR]: <FormattedMessage id="ERROR" />,
  [ALERT_TYPES.WARNING]: <FormattedMessage id="WARNING" />,
  [ALERT_TYPES.PROMPT]: <FormattedMessage id="PROMPT" />,
  [ALERT_TYPES.SUGGEST]: <FormattedMessage id="SUGGEST" />
};

export {
  ACTION_TYPES,
  ALERT_TYPES,
  ALERT_TYPE_COLORS,
  I18N_ALERT_TYPES
};
