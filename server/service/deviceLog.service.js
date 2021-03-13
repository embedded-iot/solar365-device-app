const { file, http } = require('../utils');
const globalConfig = require('../config/global')

const fileName = 'deviceLog.json';

const getDeviceLogData = async () => {
  return await file.readJSONFile(fileName);
};



const saveDeviceLogData = async (deviceLogData = {}) => {
  const res = await http.getAsyncWithConfig(globalConfig.SERVER_API);
  // console.log(res)
  if (Object.keys(deviceLogData).length) {
    deviceLogData.updateAt = new Date();
  }
  await file.writeJSONFile(fileName, deviceLogData);
};

module.exports = {
  getDeviceLogData,
  saveDeviceLogData,
}


