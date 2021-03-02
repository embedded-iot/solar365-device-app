const { network } = require('../utils')
const { masterInfo } = require("../config/global")

const actionTypes = {
  CONNECT: 'connect',
  DEVICE_LIST: 'devicelist',
}

const defaultPayload = {
  lang: 'en_us',
}

const findDeviceIPInLocalNetwork = async ({ vendor }) => {
  const ips = await network.scanAllIP()
  return ips.find(IP => IP.alive && IP.vendor && IP.vendor.indexOf(vendor) > -1) || undefined
}

const connectPayload = (body = {}) => ({
  ...defaultPayload,
  service: actionTypes.CONNECT,
  ...body
})

const deviceListPayload = (body = {}) => ({
  ...defaultPayload,
  service: actionTypes.DEVICE_LIST,
  type: 0,
  is_check_token: 0,
  ...body
})

module.exports = {
  findDeviceIPInLocalNetwork,
  actionTypes,
  connectPayload,
  deviceListPayload,
}
