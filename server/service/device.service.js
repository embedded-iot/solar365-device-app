const { file, http } = require('../utils');
const globalConfig = require('../config/global')



const filePath = 'server/data/device.json';

const getDevice = async () => {
  return await file.readJSONFile(filePath);
};

const saveDevice = async (device = {}) => {
  const res = await http.getAsyncWithConfig(globalConfig.SERVER_API);
  // console.log(res)
  await file.writeJSONFile(filePath, device);
};

module.exports = {
  getDevice,
  saveDevice
}


