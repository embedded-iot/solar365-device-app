const { http } = require('../utils');
const globalConfig = require('../config/global');
const configService = require("./config.service");

const getMasterSettings = async () => {
  const CONFIG_DATA = await configService.getConfigData();
  if (CONFIG_DATA.MasterKey) {
    const requestUrl = globalConfig.SERVER_API + '/masters/' + CONFIG_DATA.MasterKey + '/settings'
    const settings = await http.getAsyncWithConfig(requestUrl);
    await configService.saveConfigData({
      ...CONFIG_DATA,
      ...settings
    })
    return settings;
  }
  return {};
}

module.exports = {
  getMasterSettings
}
