const { file, http } = require('../utils');
const globalConfig = require('../config/global')
const configService = require("./config.service");

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

const syncStatus = async (status = false) => {
  const { MasterKey } = await getConfigData();
  const requestUrl = globalConfig.SERVER_API + '/masters/' + MasterKey + '/status'
  const data = {
    status
  }
  const res = await http.postWithConfig(requestUrl, data);
  if (!res) {
    console.log("Update master status successfully")
  }
}

module.exports = {
  getConfigData,
  saveConfigData,
  syncStatus,
}
