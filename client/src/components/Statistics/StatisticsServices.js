import { STATISTIC_STATUS_TYPES, STATISTIC_STATUS_COLORS, I18N_STATISTIC_STATUS_TYPES } from "../constants";

const transformDeviceStatisticList = (device, index) => {
  const type = device.deviceStatus ? device.deviceStatus : STATISTIC_STATUS_TYPES.OFFLINE;
  return {
    ...device,
    type,
    convertedStatus: I18N_STATISTIC_STATUS_TYPES[type] || '-',
    statusColor: STATISTIC_STATUS_COLORS[type] || '-'
  };
};

export const StatisticsServices = {
  transformDeviceStatisticList,
};
