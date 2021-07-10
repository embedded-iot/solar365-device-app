const { http } = require('../utils');
const globalConfig = require('../config/global');
const configService = require("./config.service");

const getMasterSettings = async () => {
  const CONFIG_DATA = await configService.getConfigData();
  if (CONFIG_DATA.MasterKey) {
    const requestUrl = globalConfig.SERVER_API + '/masters/' + CONFIG_DATA.MasterKey + '/settings'
    const settings = (await http.getAsyncWithConfig(requestUrl)) || {};
    await configService.saveConfigData({
      ...CONFIG_DATA,
      ...settings
    })
    return settings;
  }
  return {};
}

const syncStatus = async (status = false) => {
  const { MasterKey } = await configService.getConfigData();
  const requestUrl = globalConfig.SERVER_API + '/masters/' + MasterKey + '/status'
  const data = {
    status
  }
  const res = await http.postWithConfig(requestUrl, data);
  if (!res) {
    console.log("Sync master status successful")
  }
}
module.exports = {
  getMasterSettings,
  syncStatus
}
