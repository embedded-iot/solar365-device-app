const { file, http } = require('../utils');
const globalConfig = require('../config/global')

const fileName = 'statistics.json';

const getStatisticsData = async () => {
  return await file.readJSONFile(fileName);
};

const saveStatisticsData = async (statisticsData = {}) => {
  const res = await http.getAsyncWithConfig(globalConfig.SERVER_API);
  // console.log(res)
  statisticsData.updateAt = new Date();
  await file.writeJSONFile(fileName, statisticsData);
};

module.exports = {
  getStatisticsData,
  saveStatisticsData
}


