const { file, http } = require('../utils');
const globalConfig = require('../config/global')

const fileName = 'device.json';

const getDeviceData = async () => {
  return await file.readJSONFile(fileName);
};

const saveDeviceData = async (deviceData = {}) => {
  const res = await http.getAsyncWithConfig(globalConfig.SERVER_API);
  // console.log(res)
  deviceData.updateAt = new Date();
  await file.writeJSONFile(fileName, deviceData);
};

module.exports = {
  getDeviceData,
  saveDeviceData
}


