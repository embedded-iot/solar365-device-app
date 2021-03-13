const { file, http } = require('../utils');

const fileName = 'config.json';

const getConfigData = async () => {
  return await file.readJSONFile(fileName);
};

const saveConfigData = async (configData = {}) => {
  // const res = await http.getAsyncWithConfig(globalConfig.SERVER_API);
  // console.log(res)
  configData.updateAt = new Date();
  await file.writeJSONFile(fileName, configData);
};

module.exports = {
  getConfigData,
  saveConfigData
}
