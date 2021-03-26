const { file, http } = require('../utils');
const globalConfig = require('../config/global');
const configService = require("./config.service");

const fileName = 'device.json';

const updateDevices = async (deviceData = {}) => {
  const { MasterKey } = await configService.getConfigData();
  const requestUrl = globalConfig.SERVER_API + '/devices/syncRealDevices'
  const data = {
    masterKey: MasterKey,
    list: deviceData.list
  }
  const res = await http.getPostWithConfig(requestUrl, data);
  if (res && !res.code) {
    console.log("Devices updated success");
  } else {
    console.log("Devices updated fail");
  }
};

const getDeviceData = async () => {
  return await file.readJSONFile(fileName);
};

const saveDeviceData = async (deviceData = {}) => {
  if (deviceData && deviceData.list) {
    await updateDevices(deviceData);
  }
  deviceData.updateAt = new Date();
  await file.writeJSONFile(fileName, deviceData);
};

module.exports = {
  getDeviceData,
  saveDeviceData
}


