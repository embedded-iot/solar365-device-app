import { DateServices } from "../../Utils";
import { FormattedMessage } from "react-intl";
import React from "react";

const CATEGORIES = {
  MASTERS: 'Master',
  DEVICES: 'Devices',
  DEVICE_LOGS: 'DeviceLogs',
  FAULT: 'Fault',
  ACTIVITY_LOG: 'ActivityLog',
};

const ALERT_TYPES = {
  SUCCESS: 'Success',
  ERROR: 'Error',
  WARNING: 'Warning'
};

const I18N_CATEGORIES = {
  [CATEGORIES.MASTERS]: <FormattedMessage id="MASTER" />,
  [CATEGORIES.DEVICES]: <FormattedMessage id="DEVICES" />,
  [CATEGORIES.DEVICE_LOGS]: <FormattedMessage id="DEVICE_LOGS" />,
  [CATEGORIES.FAULT]: <FormattedMessage id="FAULT" />,
  [CATEGORIES.ACTIVITY_LOG]: <FormattedMessage id="ACTIVITY_LOG" />
};

const I18N_ALERT_TYPES = {
  [ALERT_TYPES.SUCCESS]: <FormattedMessage id="SUCCESS" />,
  [ALERT_TYPES.ERROR]: <FormattedMessage id="ERROR" />,
  [ALERT_TYPES.WARNING]: <FormattedMessage id="WARNING" />,
};

const transformSolar365FaultList = (activityLog, index) => {
  activityLog.key = index;
  // eslint-disable-next-line no-undef
  activityLog.convertedDate = DateServices.convert(activityLog.updateAt, i18n.DATE_FORMAT);
  activityLog.convertedCategory = I18N_CATEGORIES[activityLog.category] || '-';
  activityLog.convertedType = I18N_ALERT_TYPES[activityLog.type] || '-';
  return activityLog;
};

const ALERT_TYPES_OPTIONS = [
  {
    value: ALERT_TYPES.SUCCESS, label: I18N_ALERT_TYPES[ALERT_TYPES.SUCCESS]
  }, {
    value: ALERT_TYPES.ERROR, label: I18N_ALERT_TYPES[ALERT_TYPES.ERROR]
  }, {
    value: ALERT_TYPES.WARNING, label: I18N_ALERT_TYPES[ALERT_TYPES.WARNING]
  }
];

export const Solar365FaultServices = {
  transformSolar365FaultList,
  ALERT_TYPES_OPTIONS,
};
