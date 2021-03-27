const { file, http } = require('../utils');
const globalConfig = require('../config/global');
const configService = require("./config.service");

const fileName = 'deviceLog.json';

const createDeviceLog = async (deviceLogData = {}, deviceLogIOData = {}) => {
  const { MasterKey } = await configService.getConfigData();
  const requestUrl = globalConfig.SERVER_API + '/deviceLogs'
  const data = {
    masterKey: MasterKey,
    deviceId: deviceLogData.deviceId.toString(),
    deviceLogData: deviceLogData.list,
    deviceLogIOData: deviceLogIOData.list,
  }
  const res = await http.getPostWithConfig(requestUrl, data);
  if (res && !res.code) {
    console.log("Device log created");
  } else {
    console.log("Device log create fail");
  }
};

const getDeviceLogData = async () => {
  return await file.readJSONFile(fileName);
};

const saveDeviceLogData = async (deviceLogData = {}) => {
  if (Object.keys(deviceLogData).length) {
    deviceLogData.updateAt = new Date();
  }
  await file.writeJSONFile(fileName, deviceLogData);
};

const createDeviceLogData = async (deviceLogData = {}) => {
  if (deviceLogData && deviceLogData.list && deviceLogData.list.length) {
    await createDeviceLog(
      deviceLogData.list && deviceLogData.list.length ? deviceLogData.list[deviceLogData.list.length - 1] : [],
      deviceLogData.listIO && deviceLogData.listIO.length ? deviceLogData.listIO[deviceLogData.listIO.length - 1] : [])
  }
};

module.exports = {
  getDeviceLogData,
  saveDeviceLogData,
  createDeviceLogData, 
}


