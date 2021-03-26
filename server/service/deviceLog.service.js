const { file, http } = require('../utils');
const globalConfig = require('../config/global');
const configService = require("./config.service");

const fileName = 'deviceLog.json';

const createDeviceLog = async (deviceData = {}) => {
  const { MasterKey } = await configService.getConfigData();
  const requestUrl = globalConfig.SERVER_API + '/deviceLogs'
  const data = {
    masterKey: MasterKey,
    deviceId: deviceData.deviceId.toString(),
    deviceLogData: deviceData.list
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
  if (deviceLogData && deviceLogData.list && deviceLogData.list.length) {
    await createDeviceLog(deviceLogData.list[deviceLogData.list.length - 1])
  }

  if (Object.keys(deviceLogData).length) {
    deviceLogData.updateAt = new Date();
  }
  await file.writeJSONFile(fileName, deviceLogData);
};

module.exports = {
  getDeviceLogData,
  saveDeviceLogData,
}


