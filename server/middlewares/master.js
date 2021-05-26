const { network } = require('../utils')

const actionTypes = {
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
}

const alertTypes = {
  SUCCESS: 'Success',
  ERROR: 'Error',
  WARNING: 'Warning'
}

const faultEvents = {
  DEVICES: 'Devices',
  MPPT: 'MPPT',
  STRING: 'String'
}

const faultCategories = {
  LOGGER_FAULT: 'LoggerFault',
  SOLAR365_FAULT: 'Solar365Fault',
}

const activityLogCategories = {
  MASTERS: 'Master',
  DEVICES: 'Devices',
  DEVICE_LOGS: 'DeviceLogs',
  FAULT: 'Fault',
  ACTIVITY_LOG: 'ActivityLog',
}

const defaultPayload = {
  lang: 'en_us',
}

const findDeviceIPInLocalNetwork = async ({ vendor = [] } = {}) => {
  const ips = await network.scanAllIP()
  return ips.find(IP => IP.alive && IP.vendor && vendor.indexOf(IP.vendor) > -1)
}

const connectPayload = ({ token } = {}) => ({
  ...defaultPayload,
  service: actionTypes.CONNECT,
  token
})

const deviceListPayload = ({ token } = {}) => ({
  ...defaultPayload,
  service: actionTypes.DEVICE_LIST,
  type: 0,
  is_check_token: 0,
  token
})

const deviceLogPayload = ({ token, dev_id } = {}) => ({
  ...defaultPayload,
  service: actionTypes.DEVICE_LOG,
  token,
  dev_id,
})

const deviceLogIOPayload = ({ token, dev_id } = {}) => ({
  ...defaultPayload,
  service: actionTypes.DEVICE_LOG_IO,
  token,
  dev_id,
})

const statisticsPayload = ({ token } = {}) => ({
  ...defaultPayload,
  service: actionTypes.STATISTICS,
  token,
})

const faultPayload = ({ token } = {}) => ({
  ...defaultPayload,
  service: actionTypes.FAULT,
  token,
})

const statisticDeviceDetailsPayload = ({ token } = {}) => ({
  ...defaultPayload,
  service: actionTypes.STATISTICS_RUNTIME,
  token,
});

const deviceInfoPayload = ({ token, dev_id } = {}) => ({
  ...defaultPayload,
  page: 1,
  limit: 100,
  dev_id,
  token,
});

module.exports = {
  findDeviceIPInLocalNetwork,
  alertTypes,
  actionTypes,
  faultCategories,
  faultEvents,
  connectPayload,
  deviceListPayload,
  deviceInfoPayload,
  deviceLogPayload,
  deviceLogIOPayload,
  statisticsPayload,
  statisticDeviceDetailsPayload,
  faultPayload,
  activityLogCategories,
}
