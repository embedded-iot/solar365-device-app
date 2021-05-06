import React from "react";
import { FormattedMessage } from "react-intl";
import fault_I18n from "./fault_I18n";
import faultMapper from "./faultMapper";
import { DateServices } from "../../Utils";

const ALERT_TYPES = {
  ERROR: 'Error',
  WARNING: 'Warning',
  PROMPT: 'Prompt',
  SUGGEST: 'Suggest'
};

const I18N_ALERT_TYPES = {
  [ALERT_TYPES.ERROR]: <FormattedMessage id="ERROR" />,
  [ALERT_TYPES.WARNING]: <FormattedMessage id="WARNING" />,
  [ALERT_TYPES.PROMPT]: <FormattedMessage id="PROMPT" />,
  [ALERT_TYPES.SUGGEST]: <FormattedMessage id="SUGGEST" />
};

const transformLoggerFaultList = (fault, index) => {
  fault.key = index;
  const selectedFaultMapper = faultMapper.find(
    (mapper) => mapper.fault_code === fault.fault_code
  );
  const type = fault.fault_level || ALERT_TYPES.ERROR;
  return {
    ...fault,
    fault_name_i18n: fault_I18n[selectedFaultMapper.fault_name_i18nKey.toString()],
    fault_reason_i18n: fault_I18n[selectedFaultMapper.fault_reason_i18nKey.toString()],
    fault_suggest_i18n: fault_I18n[selectedFaultMapper.fault_suggest_i18nKey.toString()],
    type,
    convertedType: I18N_ALERT_TYPES[type] || '-',
    // eslint-disable-next-line no-undef
    convertedDate: DateServices.convert(fault.fault_time, i18n.DATE_FORMAT)
  };
};

const ALERT_TYPES_OPTIONS = [
  {
    value: ALERT_TYPES.ERROR, label: I18N_ALERT_TYPES[ALERT_TYPES.ERROR]
  },
  {
    value: ALERT_TYPES.WARNING, label: I18N_ALERT_TYPES[ALERT_TYPES.WARNING]
  },
  {
    value: ALERT_TYPES.PROMPT, label: I18N_ALERT_TYPES[ALERT_TYPES.PROMPT]
  },
  {
    value: ALERT_TYPES.SUGGEST, label: I18N_ALERT_TYPES[ALERT_TYPES.SUGGEST]
  }
];

export const LoggerFaultServices = {
  transformLoggerFaultList,
  ALERT_TYPES_OPTIONS,
};
