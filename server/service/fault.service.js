const { file, http } = require('../utils');
const globalConfig = require('../config/global')

const fileName = 'fault.json';

const getFaultData = async () => {
  return await file.readJSONFile(fileName);
};

const saveFaultData = async (faultData = {}) => {
  const res = await http.getAsyncWithConfig(globalConfig.SERVER_API);
  // console.log(res)
  faultData.updateAt = new Date();
  await file.writeJSONFile(fileName, faultData);
};

module.exports = {
  getFaultData,
  saveFaultData
}


