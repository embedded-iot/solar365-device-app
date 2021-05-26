import React from "react";
import { FormattedMessage } from "react-intl";
import { DateServices } from "../../Utils";
import { ALERT_TYPES, I18N_ALERT_TYPES } from "../constants";

const CATEGORIES = {
  MASTERS: 'Master',
  DEVICES: 'Devices',
  DEVICE_LOGS: 'DeviceLogs',
  FAULT: 'Fault',
  ACTIVITY_LOG: 'ActivityLog'
};


const I18N_CATEGORIES = {
  [CATEGORIES.MASTERS]: <FormattedMessage id="MASTER" />,
  [CATEGORIES.DEVICES]: <FormattedMessage id="DEVICES" />,
  [CATEGORIES.DEVICE_LOGS]: <FormattedMessage id="DEVICE_LOGS" />,
  [CATEGORIES.FAULT]: <FormattedMessage id="FAULT" />,
  [CATEGORIES.ACTIVITY_LOG]: <FormattedMessage id="ACTIVITY_LOG" />
};

const transformActivityLogList = (activityLog, index) => {
  activityLog.key = index;
  // eslint-disable-next-line no-undef
  activityLog.convertedDate = DateServices.convert(activityLog.updateAt, i18n.DATE_FORMAT);
  activityLog.convertedCategory = I18N_CATEGORIES[activityLog.category] || '-';
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

export const ActivityLogServices = {
  transformActivityLogList,
  ALERT_TYPES_OPTIONS
};
