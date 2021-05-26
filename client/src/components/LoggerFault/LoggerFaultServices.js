import { DateServices } from "../../Utils";
import { ALERT_TYPES, I18N_ALERT_TYPES } from "../constants";


const transformLoggerFaultList = (fault, index) => {
  fault.key = index;
  return {
    ...fault,
    // eslint-disable-next-line no-undef
    convertedDate: DateServices.convert(fault.updateAt, i18n.DATE_FORMAT)
  };
};

const ALERT_TYPES_OPTIONS = [
  {
    value: ALERT_TYPES.ERROR, label: I18N_ALERT_TYPES[ALERT_TYPES.ERROR]
  },
  {
    value: ALERT_TYPES.WARNING, label: I18N_ALERT_TYPES[ALERT_TYPES.WARNING]
  }
];

export const LoggerFaultServices = {
  transformLoggerFaultList,
  ALERT_TYPES_OPTIONS,
};
