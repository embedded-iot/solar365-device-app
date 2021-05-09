import React from "react";
import { DEVICE_STATUS_TYPES, I18N_DEVICE_STATUS_TYPES, DEVICE_STATUS_COLORS } from "../constants";

const transformDeviceList = (device, index) => {
  device.key = index;
  const type = device.connected ? DEVICE_STATUS_TYPES.ONLINE : DEVICE_STATUS_TYPES.OFFLINE;
  return {
    ...device,
    type,
    convertedStatus: I18N_DEVICE_STATUS_TYPES[type] || '-',
    statusColor: DEVICE_STATUS_COLORS[type] || '-'
  };
};

const STATUS_TYPES_OPTIONS = [
  {
    value: DEVICE_STATUS_TYPES.ONLINE, label: I18N_DEVICE_STATUS_TYPES[DEVICE_STATUS_TYPES.ONLINE]
  }, {
    value: DEVICE_STATUS_TYPES.OFFLINE, label: I18N_DEVICE_STATUS_TYPES[DEVICE_STATUS_TYPES.OFFLINE]
  }
];

export const DevicesServices = {
  transformDeviceList,
  STATUS_TYPES_OPTIONS
};
