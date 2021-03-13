const { http, file } = require('../utils');
const configService = require('./config.service');
const { actionTypes } = require('../middlewares/master');
const globalConfig = require('../config/global')

const fileName = 'about.json';

const requestAbout = async (params) => {
  const CONFIG_DATA = await configService.getConfigData();
  const url = CONFIG_DATA.MASTER_API + '/about/list';
  const config = {
    params: {
      page: 1,
      limit: 10,
      ...params
    }
  }
  const res = await http.getAsyncWithConfig(url, config);
  if (res && res.result_data) {
    res.result_data.service = actionTypes.ABOUT;
  }
  return res;
};

const requestProduct = async () => {
  const CONFIG_DATA = await configService.getConfigData();
  const url = CONFIG_DATA.MASTER_API + '/product/list';
  const res = await http.getAsyncWithConfig(url, {});
  if (res && res.result_data) {
    res.result_data.service = actionTypes.ABOUT;
  }
  return res;
};

const getAboutData = async () => {
  return await file.readJSONFile(fileName);
};

const saveAboutData = async (deviceData = {}) => {
  const res = await http.getAsyncWithConfig(globalConfig.SERVER_API);
  // console.log(res)
  deviceData.updateAt = new Date();
  await file.writeJSONFile(fileName, deviceData);
};

module.exports = {
  requestAbout,
  requestProduct,
  getAboutData,
  saveAboutData,
}


