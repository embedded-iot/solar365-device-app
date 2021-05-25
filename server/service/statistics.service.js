const { file, http } = require('../utils');
const globalConfig = require('../config/global');
const configService = require("./config.service");

const fileName = 'statistics.json';

const createStatistic = async (statisticData = {}) => {
  const { MasterKey } = await configService.getConfigData();
  const requestUrl = globalConfig.SERVER_API + '/statistics'
  const data = {
    masterKey: MasterKey,
    statisticData: statisticData.list
  }
  const res = await http.getPostWithConfig(requestUrl, data);
  if (res && !res.code) {
    //console.log("Statistic created");
  } else {
    console.log("Statistic create fail");
  }
};

const getStatisticsData = async () => {
  return await file.readJSONFile(fileName);
};

const saveStatisticsData = async (statisticsData = {}) => {
  if (statisticsData && statisticsData.list) {
    await createStatistic(statisticsData);
  }

  statisticsData.updateAt = new Date();
  await file.writeJSONFile(fileName, statisticsData);
};

const transformStatisticDevice = deviceStatistic => {
  let deviceStatus = '';
  if (deviceStatistic.dev_state === '65534') {
    deviceStatus = 'Offline';
  } else if (deviceStatistic.dev_state === '5120') {
    deviceStatus = 'Standby';
  } else if (deviceStatistic.dev_state === '0') {
    deviceStatus = 'Run';
  } else {
    deviceStatus = 'Shutdown';
  }
  return {
    ...deviceStatistic,
    deviceStatus,
  };
}

module.exports = {
  getStatisticsData,
  saveStatisticsData,
  transformStatisticDevice
}


